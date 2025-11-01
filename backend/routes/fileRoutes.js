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

const  { verifyFileRegistryAccess }  = require('../middleware/authMiddleware/giveAccess')

// Re-route to the tracked files page

// File Registry routes
// Re-route to the file registry page
router.post('/fileregistry', verifyFileRegistryAccess, addFile)
router.get('/fileregistry', verifyFileRegistryAccess, getAllFiles)
router.put('/fileregistry/:id', verifyFileRegistryAccess, updateFile)
// route to delete a file from the file registry
router.delete('/fileregistry/:id', verifyFileRegistryAccess, deleteFile)




router.post('/filerequests', checkRequestPermission, adminOnly, requestFile)
router.delete('/filerequests/:request_id', verifyToken, adminOnly, deleteRequest)
// route to get all pending requests
router.get('/filerequests', adminOnly, getPendingRequests)

// Re-route to the files taken page
router.get('/filestaken', verifyToken, adminOnly, getAllFilesTaken)



// Export the router
module.exports = router
