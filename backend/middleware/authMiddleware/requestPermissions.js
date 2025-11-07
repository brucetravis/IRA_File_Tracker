// import the json webtoken module to verify the token
const jwt = require('jsonwebtoken')

// // function to make sure that only logged in users can request for filea
// const checkRequestPermission = (req, res, next) => {

//     try {
//         const userRole = req.headers['role'] || 'user' // frontend sends role in headers

//         // check the user role
//         if (userRole !== 'user' && userRole !== 'admin') {
//             // Send a 403 meaning (Forbidden), unauthorized user
//             return res.status(403).json({ message: 'Permission denied. Unauthorized user.' })
//         }

//         // continue if the user is authorized
//         next()

//     } catch (err) {
//         console.error('CheckRequestPermission Error: ', err)
//         res.status(500).json({ message: 'Internal server error' })
//     }

// }

const checkRequestPermission = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'You are not logged in' });
    }

    // Allow only logged-in users (both user & admin)
    if (req.user.role !== 'user' && req.user.role !== 'admin' && req.user.role !== 'system') {
      return res.status(403).json({ message: 'Permission denied. Unauthorized user.' });
    }

    next();
  } catch (err) {
    console.error('CheckRequestPermission Error: ', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// // middleware to only allow adins access the pending files
// const adminOnly = (req, res, next) => {
    
//     try {
//         // const userRole = req.headers['role']

//         // check if the token is stored in the cookie or the authorization header
//         const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1]
        
//         // If the token is not there
//         if (!token) return res.status(401).json({ message: 'No token provided' })

//         // verify the access token using the access tokekn secret key
//         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

//         if (decoded.role !== 'admin' && decoded.role !== 'system') {
//             return res.status(403).json({ message: "Access denied, admins only" })
//         }
        
//         // Authorize if the user is an admin
//         next()

//     } catch (err) {
//         console.error('adminsOnly Error: ', err)
//         res.status(500).json({ message: 'Internal Server Error.'})
//     }

// }

const adminOnly = (req, res, next) => {
  // check if verifyToken gave us a user
  if (!req.user) {
    return res.status(401).json({ message: "You are not logged in" });
  }

  // check the user's role
  if (req.user.role !== "admin" && req.user.role !== "system") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  // if everything is fine, allow them to continue
  next();
};


module.exports = {
    checkRequestPermission, adminOnly
}



