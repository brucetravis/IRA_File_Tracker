// import the express module
const express = require('express')
// import the express minimalist app
const router = express.Router()

// import the users controller
const { getAllUsers, deleteUser, editUser } = require('../controllers/usersController')

// get the admin only middleware so that only admins can view the users in the system
// const { adminOnly } = require('../middleware/authMiddleware/requestPermissions')

// Get the middleware to verify if the users token is valid
const verifyToken = require('../middleware/verifytoken/verifyToken')

// middleware to verify the users role
const {adminOnly} = require('../middleware/authMiddleware/requestPermissions')

// re-route to the users page
router.get('/users', verifyToken, adminOnly, getAllUsers)
router.delete('/users/:id', verifyToken, deleteUser)
router.put('/users/:id', verifyToken, editUser)

// export the users route
module.exports = router
