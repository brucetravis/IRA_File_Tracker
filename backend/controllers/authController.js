// import the jsonwebtoken module to generate tokens
const jwt = require('jsonwebtoken')
// import the bcrypt module to gash passwords before saving
const bcrypt = require('bcrypt')
// import the pool so that we cab connect to mysql
const pool = require('../database/db')
// import dotenv to load environment variables
const dotenv = require('dotenv')


// function to generate the access token
const generateAccessToken = (user) => {

    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
    )
}


// function to generate a refresh token
const generateRefreshToken = (user) => {

    return jwt.sign(
        { id: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
    )
}



// Function to register a user
const register = async (req, res, next) => {

    // Get the name, email, password and the departmetn from the request body
    const { name,  email, department, password, confirmPassword} = req.body

    // If the name, email and password are missing
    if (!name || !email || !password) {
        // inform the user that "All fields are required"
        return res.status(400).json({ message: "All fields required." })
    }

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])

        // if the length of the results is greater than 0
        if (rows.length > 0) {
            return res.status(409).json({ message: "User already exists." })
        }

        // Check if the passwords are equal
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords MUST match" })
        }
        
        // else, hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // user status
        const status = "Inactive"

        // create the user 
        const createUser = `
            INSERT into users (name, email, password, hashedPassword, department, role, status, refreshToken)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?)
        `

        if (name === "alpha") {
            await pool.query(createUser, [name, email, password, hashedPassword, department, "admin", status, null])
        } else {
            await pool.query(createUser, [name, email, password, hashedPassword, department, "user", status, null])
        }
        
        // return a success message
        return res.status(201).json({ message: "User registered successfully." })


    } catch (err) {
        console.log('REGISTRATION ERROR: ', err)
        console.error("MYSQL ERROR: ", err.sqlMessage || err.message)
        next(err)
    }

}


// function to log in a user
const logIn = async (req, res, next) => {

    // Get the email and the password from the request body
    const { email, password } = req.body

    // if email and the password, inform the user
    if (!email || !password) return res.status(400).json({ message: "Email and Password are required." })

    try {
        // Check if the user already exists
        const checkUser = 'SELECT * FROM users WHERE email = ?'

        const [rows] = await pool.query(checkUser, [email])

        // if the length of the results is 0
        if (rows.length === 0) return res.status(400).json({ message: "User Not Found" })
        
        // if the user exists

        // Get the user
        const user = rows[0]

        // Check the password
        const isMatch = await bcrypt.compare(password, user.hashedPassword)
        // if they are not a match
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials." })

        // Generate the access token and the refresh token
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)


        // Save the refresh token to the database
        await pool.query(`
            UPDATE users SET refreshToken = ?, status = 'Active', lastLogin = Now() WHERE id = ?`, 
            [refreshToken, user.id]
        )

        // set the refresh token as a http only cookie
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true, // set to true in production with http
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        res.json({
            message: "Login successful",
            accessToken,
            role: user.role,
            name: user.name,
            email: user.email
        })

    } catch (err) {
        console.log ('ERROR: ', err)
        next(err)
    }
}


// function to generate a new refresh token
const refreshToken = async (req, res) => {

    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(401).json({ message: "No refresh Token." })

    const refreshToken = cookies.jwt

    // Read the refreshToken from the database
    const checkRefreshToken = 'SELECT * FROM users WHERE refreshToken = ?'

    try {
        
        // check if the refresh token exists in the database
        const [rows] = await pool.query(checkRefreshToken, [refreshToken])
        // if it is invalid, inform the developer
        if (rows.length === 0) return res.status(403).json({ message: "Invalid refresh token" })

        const user = rows[0]
        
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err ||  user.id !== decoded.id) return res.status(401).json({ message: "Invalid Token" })
            
            const accessToken = generateAccessToken(user)
            res.json({ accessToken })
        })


    } catch (err) {
        console.log('REFRESH TOKEN REG ERROR: ', err)
        if (err) return res.status(500).json({ message: "Database error" })
    }

}


// function to log out the user
const logOut = async (req, res, next) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)

    const refreshToken = cookies.jwt

    const appLogOut = "Update users SET refreshToken = Null, status='Inactive' WHERE refreshToken = ?"

    try {
        await pool.query(appLogOut, [refreshToken])

        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        })

        res.json({ message: "Logged Out successfully" })

    } catch (err) {
        console.error("LOGOUT ERROR:", err);
        return res.status(500).json({ message: "Database error" })
    }
}




// export the function
module.exports = { 
    register, logIn, 
    refreshToken, logOut 
}


