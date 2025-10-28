// import the jsonwebtoken module
const jwt = require('jsonwebtoken')

// function to verify a token
const verifyToken = (req, res, next) => {

    // Get the authorization header
    const authHeader = req.headers['authorization']

    // check if the token exists and starts with a bearer
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' })
    }

    // verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {

        // if there is an error, return a 403 meaning that they are forbidden fro accessing the route
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token." })
        }

        // Attach the decoded info to the request
        req.user = decoded

        // pass control to the next route
        next()
    })

}

module.exports = verifyToken

