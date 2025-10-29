// import the express module
const express = require("express")
// create an express minimallist router'
const router = express.Router()

// import the register controller from the authControllers file
const { register } = require('../controllers/authController')

router.post('/', register)


// export the route
module.exports = router