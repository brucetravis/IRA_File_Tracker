// function to make sure that only logged in users can request for filea
const checkRequestPermission = (req, res, next) => {

    try {
        const userRole = req.headers['role'] || 'user' // frontend sends role in headers

        // check the user role
        if (userRole !== 'user' && userRole !== 'admin') {
            // Send a 403 meaning, unauthorized user
            return res.status(403).json({ message: 'Permission denied. Unauthorized user.' })
        }

        // continue if the user is authorized
        next()

    } catch (err) {
        console.error('CheckRequestPermission Error: ', err)
        res.status(500).json({ message: 'Internal server error' })
    }

}


// middleware to only allow adins access the pending files
const adminOnly = (req, res, next) => {
    
    try {
        const userRole = req.headers['role']

        // if the useRole is not admin
        if (userRole !== 'admin' || userRole !== 'system') {
            return res.status(403).json({ message: 'Access denied, admins only.' })
        }

        // Authorize if the user is an admin
        next()

    } catch (err) {
        console.error('adminsOnly Error: ', err)
        req.status(500).json({ message: 'Internal Server Error.'})
    }

}


module.exports = {
    checkRequestPermission, adminOnly
}

