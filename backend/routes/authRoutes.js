// import the express module
const express = require("express")
// create a minimalist router app from express
const router = express.Router()
// import the authController
const authController = require('../controllers/authController')


// Route to the registration page
router.post('/', authController.register)
router.post('/logIn', authController.logIn)
router.post('/logout', authController.logOut)
router.post('/refresh', authController.refreshToken)

module.exports = router

