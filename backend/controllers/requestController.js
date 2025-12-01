// import the pool ( a reusabe group of connections kept open to be shared)
const pool = require('../database/db')



const requestFile = async (req, res, next) => {
  try {
    // get the file id from the request parameter
    const { id } = req.params

    const { name, department } = req.user

    const today = new Date().toISOString().split('T')[0];

    // command to fetch the file info from the database according to the id
    const fetchCommand = `SELECT * FROM file_registry WHERE id = ?`

    // Get the files details from the database
    const [rows] = await pool.query(fetchCommand, [id])

    // if the rows are empty, notify the user that the file has not been found
    if (rows.length === 0) {
        return res.status(404).json({ message: "File Not Found" })
    }

    const file = rows[0]

    if (file.status === "Taken") {
        return res.status(404).json({ message: " The file is not available" })
    }

    // ✅ Check if the user already requested this file
    const checkRequestCommand = `
      SELECT * FROM file_requests
      WHERE requester_name = ? AND file_name = ? AND status = 'Pending'
    `;
    const [existingRequests] = await pool.query(checkRequestCommand, [name, file.name]);

    if (existingRequests.length > 0) {
      return res.status(409).json({ message: "You already requested this file. Wait for Approval" });
    }
    
    // if the file is available, insert the file data inthe file requests table
    const insertCommand = `
        INSERT INTO file_requests (requester_name, requester_department, file_name, request_date, status)
        VALUES(?, ?, ?, NOW(), ?)
    `

    const [result] = await pool.query(insertCommand, [
        name, 
        department, // from the req.user
        file.name, // from file_registry
        "Pending"
    ])


    // insert the information in the notifications table
    const notificationsCommand = `
        INSERT into notifications (name, type, notification_text, category, date)
        VALUES (?, ?, ?, ?, ?)
    `

    // insertion query
    await pool.query(notificationsCommand, [name, 'info', `${name} from the ${department} department requested for the file ${file.name}.`, 'Request', today])


    // send a success response
    res.status(201).json({ 
        message: "File request submitted successfully",
        request: result.insertId
    })

  } catch (err) {
    console.error("REQUESTING FILE ERROR:", err.message);
    next(err);
  }
};


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

        // Get the file id from the request parameter
        const { request_id } = req.params

        const { name, department } = req.user

        const today = new Date().toISOString().split('T')[0];

        // command to update the status of the file in the file_requests table
        const approveCommand = `
            UPDATE file_requests
            SET status = "Approved"
            WHERE request_id = ?
        `
        
        // query the database to update the file status
        const [result] = await pool.query(approveCommand, [request_id])

        // if there are no rows affected, send an error message
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "File requests update Failed." })
        }

        // Fetch the updated result details from the file requests table so that we can insert it to the audit table
        const [rows] = await pool.query(`SELECT * FROM file_requests WHERE request_id = ?`, [request_id])

        const fileRequest = rows[0]
        
        if (!fileRequest) {
            return res.status(404).json({ message: "File request not found." });
        }

        // insert the file information with the updated status into the audit table
        const insertCommand = `
            INSERT INTO audit (requester_name, requester_department, file_name, request_date, status)
            VALUES (?, ?, ?, ?, ?)
        `

        // Query the database to insert the file into the audit table
        const [auditResult] = await pool.query(insertCommand, [
            fileRequest.requester_name,
            fileRequest.requester_department,
            fileRequest.file_name,
            fileRequest.request_date,
            fileRequest.status
        ])

        // if there are no rows affected, return an error message
        if (auditResult.affectedRows === 0) {
            return res.status(400).json({ message: "file Not inserted into the audits table." })
        }

        // Update the file status in the file registry table to Taken

        // update command
        const updateCommand = `
            UPDATE file_registry
            SET status = "Taken"
            WHERE name = ?
        `
        
        // query the database to update the table
        const [updateResult] = await pool.query(updateCommand, [fileRequest.file_name])

        // if no rows were affected, respond with a return message
        if (updateResult.affectedRows === 0) {
            return res.status(400).json({ message: "File Update failed" })
        }


        // Fetch the updated info from file resgistry so that we can have values for teh files taken table
        const [registryRows] = await pool.query('SELECT * FROM file_registry')

        if (registryRows.length === 0) {
            return res.status(404).json({ message: 'No files in the file registry' })
        }

        const filesTakenContent = registryRows[0]


        // insert the file into the files taken table after updating the status in the files taken table
        const takenInsertionCommand = `
            INSERT INTO files_taken (file_name, taken_by, department, date_taken, status)
            VALUES (?, ?, ?, ?, ?)
        `

        
        const [takenInsertedResults] = await pool.query(takenInsertionCommand, [
            filesTakenContent.name,
            fileRequest.requester_name,
            filesTakenContent.department,
            fileRequest.request_date,
            filesTakenContent.status
        ])

        if (takenInsertedResults.affectedRows === 0) {
            return res.status(400).json({ message: "File insertion failed" })
        }

        // Delete the file from the file requests table since It has already been approved
        const deleteCommand = `
            DELETE FROM file_requests WHERE request_id = ?
        `
        // query the table to delete file
        await pool.query(deleteCommand, [request_id])


        // insert the information in the notifications table
        const notificationsCommand = `
            INSERT into notifications (name, type, notification_text, category, date)
            VALUES (?, ?, ?, ?, ?)
        `

        // insertion query
        await pool.query(notificationsCommand, [name, 'info', `Your request for ${filesTakenContent.name} has been approved.`, 'Approved', today])
        

        res.status(200).json({ 
            message: "File request approved and logged successfully.",
            request_id: result.insertId,
            requester_name: name,
            requester_department: department,
            file_name: fileRequest.name,
            request_date: new Date().toISOString(),
            status: "Pending"
        });

    } catch (err) {
        console.log('ERROR HANDLING THE APPROVAL: ', err.message)
        next(err)
    }
}


// function to handle the request approval
const rejectRequest = async (req, res, next) => {

    try {

        // Get the file id from the request parameter
        const { request_id } = req.params

        const { name, department } = req.user

        const today = new Date().toISOString().split('T')[0];

        // command to update the status of the file in the file_requests table
        const rejectCommand = `
            UPDATE file_requests
            SET status = "Rejected"
            WHERE request_id = ?
        `
        
        // query the database to update the file status
        const [result] = await pool.query(rejectCommand, [request_id])

        // if there are no rows affected, send an error message
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "File requests update Failed." })
        }

        // Fetch the updated result details from the file requests table so that we can insert it to the audit table
        const [rows] = await pool.query(`SELECT * FROM file_requests WHERE request_id = ?`, [request_id])

        const fileRequest = rows[0]
        
        if (!fileRequest) {
            return res.status(404).json({ message: "File request not found." });
        }

        // insert the file information with the updated status into the audit table
        const insertCommand = `
            INSERT INTO audit (requester_name, requester_department, file_name, request_date, status)
            VALUES (?, ?, ?, ?, ?)
        `

        // Query the database to insert the file into the audit table
        const [auditResult] = await pool.query(insertCommand, [
            fileRequest.requester_name,
            fileRequest.requester_department,
            fileRequest.file_name,
            fileRequest.request_date,
            fileRequest.status
        ])

        // if there are no rows affected, return an error message
        if (auditResult.affectedRows === 0) {
            return res.status(400).json({ message: "file Not inserted into the audits table." })
        }

        // Delete the file from the file requests table since It has already been approved
        const deleteCommand = `
            DELETE FROM file_requests WHERE request_id = ?
        `
        // query the table to delete file
        await pool.query(deleteCommand, [request_id])


        // Update the file status in the file registry table to Taken

        // update command
        const updateCommand = `
            UPDATE file_registry
            SET status = "Available"
            WHERE name = ?
        `
        
        // query the database to update the table
        const [updateResult] = await pool.query(updateCommand, [fileRequest.file_name])

        // if no rows were affected, respond with a return message
        if (updateResult.affectedRows === 0) {
            return res.status(400).json({ message: "File Update failed" })
        }

        // insert the information in the notifications table
        const notificationsCommand = `
            INSERT into notifications (name, type, notification_text, category, date)
            VALUES (?, ?, ?, ?, ?)
        `

        // insertion query
        await pool.query(notificationsCommand, [name, 'info', `Your request for ${fileRequest.name} has been rejected.`, 'rejected', today])
        

        res.status(200).json({ 
            message: "File request rejected and logged successfully.",
            request_id: result.insertId,
            requester_name: name,
            requester_department: department,
            file_name: fileRequest.name,
            request_date: new Date().toISOString(),
            status: "Rejected"
        });

    } catch (err) {
        console.log('ERROR HANDLING THE Rejection: ', err.message)
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
    handleRequestApproval, deleteRequest,
    rejectRequest
}


