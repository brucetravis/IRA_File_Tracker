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


// Re-route to the tracked files page
router.post('/filerequests', checkRequestPermission, requestFile)
router.delete('/filerequests/:request_id', adminOnly, deleteRequest)
// route to get all pending requests
router.get('/filerequests', adminOnly, getPendingRequests)
// route to delete a file from the file registry
router.delete('/fileregistry/:id', deleteFile)
// Re-route to the files taken page
router.get('/filestaken', getAllFilesTaken)
router.put('/fileregistry/:id', updateFile)
// Re-route to the file registry page
router.get('/fileregistry', getAllFiles)
router.post('/fileregistry', addFile)

// Export the router
module.exports = router
