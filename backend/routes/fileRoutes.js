// import the express module
const express = require('express')
// Get the minimalist express router
const router = express.Router()

// Get the file controllers from the controllers
const { 
    getAllFiles, 
    getAllFilesTaken, 
    // getAllTrackedFiles,
    archiveFile,
    updateFile,
    addFile,
    fileReturned,
    getArchivedFiles,
    unArchiveFile
} = require('../controllers/fileController')
const { checkRequestPermission, adminOnly } = require('../middleware/authMiddleware/requestPermissions')

// Get the request controllers from the controllers
const { 
    requestFile,
    getPendingRequests,
    handleRequestApproval,
    rejectRequest,
    deleteRequest
} = require('../controllers/requestController')

const { getAudits } = require('../controllers/auditController')


// Get the middleware to verify users
const verifyToken = require('../middleware/verifytoken/verifyToken')

const  { verifyFileRegistryAccess }  = require('../middleware/authMiddleware/giveAccess')

// Re-route to the tracked files page

// File Registry routes
// Re-route to the file registry page
router.post('/fileregistry', verifyToken, adminOnly, addFile)
router.get('/fileregistry', verifyFileRegistryAccess, getAllFiles)
router.put('/fileregistry/:id', verifyToken, adminOnly, updateFile)
// route to archive a file in the file registry
router.post('/fileregistry/:id', verifyToken, adminOnly, archiveFile)
// route to get all the archived files
router.get('/archives', verifyToken, adminOnly, getArchivedFiles)
router.post('/archives/:id', verifyToken, adminOnly, unArchiveFile)



router.post('/filerequests/:id',  verifyToken, checkRequestPermission, requestFile)
router.delete('/filerequests/:request_id', verifyToken, adminOnly, deleteRequest)
// route to get all pending requests
router.get('/filerequests', verifyToken, adminOnly, getPendingRequests)
// Route to approve a pending request
router.put('/filerequests/:request_id/approve', verifyToken, adminOnly, handleRequestApproval)
// Route to reject a pending request
router.put('/filerequests/:request_id/reject', verifyToken, adminOnly, rejectRequest)

// Re-route to the files taken page
router.get('/filestaken', verifyToken, adminOnly, getAllFilesTaken)
router.post('/filestaken', verifyToken, adminOnly, fileReturned)

router.get('/audit', verifyToken, adminOnly, getAudits)

// Export the router
module.exports = router
