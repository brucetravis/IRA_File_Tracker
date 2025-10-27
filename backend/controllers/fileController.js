// import the pool from the db
const pool = require('../database/db')

// function to get all the files
const getAllFiles = async (req, res, next) => {
    
    try {
        // Destructure to get all the rows
        const [rows] = await pool.query('SELECT * FROM file_registry')
        // respond in json format
        res.json(rows)

    } catch (err) {
        res.status(500).json({ error: err.message })
        next(err)
    }
}


// function to get all the files taken
const getAllFilesTaken = async (req, res, next) => {

    try {
        // Destructure to get all the rows
        const [rows] = await pool.query('SELECT * FROM files_taken') // resolve the promise
        res.json(rows)

    } catch (err) {
        // catch the error with a status of 500 and the error message
        res.status(500).json({ error: err.message })
        next(err)
    }
}


// function to get all tracked files 
const getAllTrackedFiles = async (req, res, next) => {

    try {
        // Destructure to get the rows (pool.query has rows and fields(metadata))
        const [rows] = await pool.query(
            `SELECT
                id, 
                name, 
                department, 
                DATE_FORMAT(date_uploaded, '%Y-%m-%d') AS date_uploaded,
                TIME_FORMAT(time_uploaded, '%H:%i:%s') AS time_uploaded,
                status 
            FROM file_tracker
            `
        )
        res.json(rows) // respond with the rows
        
    } catch (err) {
        console.log('ERROR: ', err.message)
        // catch the error with a status of 500 and the error message
        // res.status(500).json({ error: err.message })
        next(err)
    }
}



// function to deletea  file
const deleteFile = async (req, res, next) => {

    // extract id from the url
    const { id } = req.params

    try {
        // Get the result of all the affected rows
        const [result] = await pool.query(
            'DELETE FROM file_registry WHERE id = ?',
            [id]
        )

        // if there are no affected rows
        if (result.affectedRows === 0) {
            // return a 404 which means that the resource or file you are deleting was not found
            return res.status(404).json({ message: 'File not found.'})
        }

        // Otherwise, post a success message which shows that the file was deleted successfully
        res.status(200).json({ message: 'File deleted successfully.' })

    } catch (err) {
        console.log('ERROR DELEITING FILE: ',err)
        next(err) // send real errors to the logger
    }
}


// function to update a files details
const updateFile = async (req, res, next) => {

    try {
        // Extract the id from the url
        const { id } = req.params

        const now = new Date()

        // date format
        // now.toISOString() → converts that Date object to a string in ISO format ("2025-10-11T17:12:45.678Z")
        const date_uploaded = now.toISOString().split('T')[0] // split the date time string into 2 parts at 'T' and take the first ([0]) part of the array which is the date
        // time format
        const time_uploaded = now.toTimeString().split(' ')[0] // .split(' ') → splits that string at the space character, giving:
        
        // console.log({ date_uploaded, time_uploaded });

        // Get the values the admin filled on the form
        let { name, department, status } = req.body

        // // clean up the name and the department, convert them to uppercase
        // const nameClean = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        // const departmentClean = department.toUpperCase()

        // console.log("UPDATE FILE BODY:", req.body);

        // Update the files details
        const [result] = await pool.query(
            `UPDATE file_registry
            SET name = ?, department = ?, date_uploaded = ?, time_uploaded = ?, status = ?        
            WHERE id = ?
            `,
            [name, department, date_uploaded, time_uploaded, status, id]
        )

        // if no rows have been affected
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'File not found.'})
        }

        // Respond with a success message
        res.status(200).json({ message: 'File Updated successfully.'})

    } catch(err) {
        console.log('UPDATE ERROR: ', err.message)
        // res.status(500).json({ error: err.message })
        next(err) // send real errors to the logger
    }
}



// function to add a file to the database
const addFile = async (req, res, next) => {
    
    try {
        // Get the form data from the request body
        const { name, department } = req.body
        
        // const nameClean = name.toLowerCase().trim()
        const nameClean = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        const departmentClean = department.toUpperCase().trim()

         // if any of the fields are missing
        if (!nameClean || !departmentClean) {
            return res.status(400).json({ message: "All fields required." })
        }

        // Check if the file exists
        const [existing] = await pool.query(
            'SELECT * FROM file_registry WHERE name = ?',
            [nameClean]
        )

        console.log('EXISTING DATA: ', existing)

        // check if the file exists
        if (existing.length > 0) {
            // return a 409 error which states that there is a conflict
            return res.status(409).json({ message: 'File already exists'}) // this willl alos exit the function immediately
        }

        // status of the file should be automitically available
        const status = 'Available'
        // Generate date and time stamps for the data
        const now = new Date()
        
        const date_uploaded = now.toISOString().split('T')[0]
        const time_uploaded = now.toTimeString().split(' ')[0]

        // query the database to post the form data
        const [result] = await pool.query(
            `
                INSERT INTO file_registry (name, department, date_uploaded, time_uploaded, status)
                VALUES (?, ?, ?, ?, ?)
            `,
            [nameClean, departmentClean, date_uploaded, time_uploaded, status]
        )

        // Respond with a success message
        res.status(201).json({ 
            message: 'File Added successfully.',
            fileId: result.insertId
        })


    } catch (err) {
        // log the error message
        console.log('ERROR: ', err.message)
        // pass the error to the middlware so that It can be logged
        next(err)
    }
}





// Export the two functions
module.exports = { 
    getAllFiles, 
    getAllFilesTaken, 
    getAllTrackedFiles,
    deleteFile,
    updateFile,
    addFile
}






