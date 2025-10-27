// import the express module
const express = require('express')
// import the express minimalist app
const router = express.Router()

// import the users controller
const { getAllUsers } = require('../controllers/usersController')

// re-route to the users page
router.get('/users', getAllUsers)

// export the users route
module.exports = router
