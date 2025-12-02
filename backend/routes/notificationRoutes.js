// import the express module
const express = require('express')
// create a minimalist express router
const router = express.Router()

// import the notification router
const { getAllNotifications, markNotAsRead, markAllAsRead } = require('../controllers/notificationsController')


// Get the middleware to verify if the users token is valid
const verifyToken = require('../middleware/verifytoken/verifyToken')

// middleware to verify the users role
// const {adminOnly} = require('../middleware/authMiddleware/requestPermissions')


// router to get all notifications
router.get('/notifications', verifyToken, getAllNotifications)
router.put('/notifications/:id', verifyToken, markNotAsRead)
router.put('/notifications/markAll', verifyToken, markAllAsRead)

// export the router
module.exports = router