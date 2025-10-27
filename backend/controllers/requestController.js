// import the pool ( a reusabe group of connections kept open to be shared)
const pool = require('../database/db')


// function to request a file
const requestFile = async (req, res, next) => {
    
    try {
        // Get the user input from the front end
        const { requester_name, requester_department, file_id } = req.body

        // check if the file is available
        if (!requester_name || !file_id) {
            return res.status(400).json({ message: "Bad Request, info does not exist" })
        }

        // check if the file exists
        const [fileRows] = await pool.query(
            // query the id and the status of the file
            `SELECT id, status FROM file_registry WHERE id = ?`,
            [file_id]
        )

        // Validate the presence
        if (!fileRows || fileRows.length === 0) {
            // if no file is found in the database return a 404 error
            return res.status(404).json({ message: 'File not Found.'})
        }

        // check file availability.
        if (fileRows[0].status !== "Available") {
            // if it is not, respond with a response error
            return res.status(409).json({ message: 'File is not available for request'})
        }

        const [result] = await pool.query(
            `
                INSERT INTO file_requests (file_id, requester_name, requester_department, status, requested_on)
                VALUES (?, ?, ?, 'Pending', today)
            `,
            [file_id, String(requester_name).trim(), requester_department ? String(requester_department).trim(): null]
        )

        const created = {
            id: result.insertId,
            file_id,
            requester_name,
            requester_department,
            status: 'pending',
            requested_on: new Date().toISOString(),
        }

        return res.status(201).json(created)

    } catch (err) {
        console.error(`REQUESTING FILE ERROR: `, err.message)
        next(err)
    }

}

// function to get all pending requests waiting for approval
const getPendingRequests = async (req, res, next) => {

    try {
        // send a query to the database
        const [rows] = await pool.query(
            // `
            // SELECT fr.request_id AS request_id, fr.file_id, fr.requester_name, fr.requester_department, fr.status, fr.requested_on,
            //     f.name AS file_name, f.department AS file_department
            // FROM file_requests fr
            // JOIN file_registry f ON fr.file_id = f.id
            // WHERE fr.status = 'pending'`

            `
                SELECT * FROM file_requests WHERE status = "Pending"
            `
        )

        // respond with a 200 meaning successful response
        res.status(200).json(rows)

    } catch (err) {
        console.log("ERROR GETTING PENDING REQUESTS: ", err.message)
        next(err)
    }
}


// function to handle the request approval
const handleRequestApproval = async (req, res, next) => {

    try {
        // Receive the request id and the admins action from the request body of the front end
        const { request_id, action, return_on } = req.body

        // Validate if any of them exists. This is because, even through the admin sent them, 
        // the request body may be empty due to bugs and erros in the front end side.
        if (!request_id || !action) {
            // Exit the functino returning a message
            return res.status(400).json({ message: "Request ID and action are required." })
        }

        // Query the file requests tabel to see if the request status is "available" in the database
        const [requestRows] = await pool.query(
            `
            SELECT * FROM file_requests WHERE request_id = ?
            `,
            [request_id]
        )

        // if the requestRow are empty or the length is 0
        if (!requestRows || requestRows.length === 0) {
            // respond with a 400 error status
            return res.status(400).json({ message: 'Request Not Found.' })
        }

        // Check if the request is already approved
        if (requestRows[0].status === "Approved") {
            // return a message meaning “this action can’t be performed because the resource is already in the desired state.”
            return res.status(409).json({ message: "Request already Approved." })
        }

        // if the admin clicks approve
        if (action === "Approve") {
            // change the status of the file in the file registry table to taken
            await pool.query(
                `
                UPDATE file_registry SET status = "Taken" WHERE id = ?
                `,
                [requestRows[0].file_id]
            )

            // query the file registry to get the file name since the file_requests does not have a name column
            const [fileRows] = await pool.query(
                `
                    SELECT name FROM file_registry WHERE id = ?
                `,
                [requestRows[0].file_id]
            )


            // Check if the fileRows exist or if the length is 0
            if (!fileRows || fileRows.length === 0) {
                return res.status(404).json({ message: 'File details not found in registry' })
            }

            // Add the file to the files taken table
            await pool.query(
                `
                    INSERT INTO files_taken (name, taken_by, department, date_taken, return_date)
                    VALUES(?, ?, ?, ?, ?)
                `,
                [
                    fileRows[0].name, 
                    requestRows[0].requester_name,
                    requestRows[0].requester_department, 
                    requestRows[0].requested_at, 
                    return_on
                ]
            )

            // Update the request status to approved
            await pool.query(
                `
                    UPDATE file_requests SET status = "Approved" WHERE request_id = ?
                `,
                [requestRows[0].request_id] // This is the id of the file that we queried
            )
        }

        // if the admin rejects the request
        if (action === "Reject") {
            // Update the request status to rejected
            await pool.query(
                `
                    UPDATE file_requests SET status = "Rejected" WHERE request_id = ?
                `,
                [requestRows[0].request_id]
            )

            // change the status back to available if needed
            await pool.query(
                `
                    UPDATE file_registry SET status = "Available" WHERE id = ?
                `,
                [requestRows[0].file_id]
            )
        }

        // success message
        res.status(200).json({ message: `Request ${action}d successfully` })

    } catch (err) {
        console.log('ERROR HANDLING THE: ', err.message)
        next(err)
    }
}


// function to delete a request
const deleteRequest = async(req, res, next) => {

    try {
        // Extract the request id from the request parameter 
        const { request_id } = req.params
        console.log('DELETE endpoint hit ✅', req.params);

        console.log('THIS IS THE REQUEST ID: ', request_id)
        
        const [result] = await pool.query(
            `
                DELETE FROM file_requests WHERE request_id = ?
            `,
            [request_id]
        )

        // if there are no affected rows, it means that the request was not found
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Request Not Found" })
        }

        // Otherwise, post a success message
        res.status(200).json({ message: 'Request Deleted successfully.' })

    } catch (err) {
        console.log("There was an issue deleting the request: ", err.message)
        next(err)
    }
}


module.exports = {
    requestFile, getPendingRequests, 
    handleRequestApproval, deleteRequest
}


