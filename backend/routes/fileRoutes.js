// import the express module
const express = require('express')
// Get the minimalist express router
const router = express.Router()

// Get the file controllers from the controllers
const { 
    getAllFiles, 
    getAllFilesTaken, 
    // getAllTrackedFiles,
    deleteFile,
    updateFile,
    addFile
} = require('../controllers/fileController')
const { checkRequestPermission, adminOnly } = require('../middleware/authMiddleware/requestPermissions')

// Get the request controllers from the controllers
const { 
    requestFile,
    getPendingRequests,
    deleteRequest
} = require('../controllers/requestController')


// Get the middleware to verify users
const verifyToken = require('../middleware/verifytoken/verifyToken')


// Re-route to the tracked files page
router.post('/filerequests', checkRequestPermission, adminOnly, requestFile)
router.delete('/filerequests/:request_id', verifyToken, adminOnly, deleteRequest)
// route to get all pending requests
router.get('/filerequests', adminOnly, getPendingRequests)
// route to delete a file from the file registry
router.delete('/fileregistry/:id', verifyToken, deleteFile)
// Re-route to the files taken page
router.get('/filestaken', verifyToken, adminOnly, getAllFilesTaken)
router.put('/fileregistry/:id', verifyToken, updateFile)
// Re-route to the file registry page
router.get('/fileregistry', verifyToken, getAllFiles)
router.post('/fileregistry', verifyToken, addFile)


// Export the router
module.exports = router
