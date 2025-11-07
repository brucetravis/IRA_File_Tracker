// import the jsonwebtoken module
const jwt = require('jsonwebtoken')

// function to verify a token
const verifyToken = (req, res, next) => {

    console.log("🟡 verifyToken reached")

    // Get the authorization header
    const authHeader = req.headers['authorization']

    console.log("Authorization header:", authHeader)

    // check if the token exists and starts with a bearer
    const token = authHeader && authHeader.split(' ')[1]

    console.log("Extracted token:", token)

    if (!token) {
        console.log("❌ No token found")
        return res.status(401).json({ message: 'Access Denied: No token provided' })
    }

    // verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {

        // if there is an error, return a 403 meaning that they are forbidden from accessing the route
        if (err) {
            console.log("❌ Token verification failed:", err.message)
            return res.status(403).json({ message: "Invalid or expired token." })
        }

        console.log("✅ Token verified successfully:", decoded)

        console.log("Decoded token:", decoded);

        // Attach the decoded info to the request
        req.user = decoded

        // pass control to the next route
        next()
    })

}

module.exports = verifyToken

