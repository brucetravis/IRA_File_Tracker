// import the json web token module
const jwt = require('jsonwebtoken')

// function to give access to everyone
const verifyFileRegistryAccess = (req, res, next) => {

    try {
        // Get the token from the authorizatino header
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'No token provided, Please Log In' })
        }

        // verify the token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        // check if the role is user or admin
        if (decoded.role !== 'user' && decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Only users or admins allowed.' });
        }

        // Attach decoded info to request for later use if needed
        req.user = decoded;

        next(); // allow access

    } catch (err) {
        console.error('FileRegistryAccess Error:', err);
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
}


module.exports = { verifyFileRegistryAccess }


