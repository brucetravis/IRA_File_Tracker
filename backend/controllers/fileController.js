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
        let { name, department } = req.body

        // // clean up the name and the department, convert them to uppercase
        // const nameClean = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        // const departmentClean = department.toUpperCase()

        // console.log("UPDATE FILE BODY:", req.body);


        // query the file_registry to update the status
        const [rows] = await pool.query('SELECT * FROM file_registry')

        // if the rows are empty send a 4040 meaning that 0 files are in the registry
        if (rows.length === 0) {
            return res.status(404).json({ message: 'File registry Empty' })
        }

        // store the rows in a variable
        const file = rows[0]

        // Update the files details
        const [result] = await pool.query(
            `UPDATE file_registry
            SET name = ?, department = ?, date_uploaded = ?, time_uploaded = ?, status = ?        
            WHERE id = ?
            `,
            [name, department, date_uploaded, time_uploaded, file.status, id]
        )

        // if no rows have been affected
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'File not found.'})
        }

        // fetch the updated row
        const [updatedFile] = await pool.query(`SELECT * FROM file_registry WHERE id = ?`, [id])


        res.status(200).json(updatedFile[0])
        // Respond with a success message
        res.status(200).json({ message: `File Updated successfully.`})

    } catch(err) {
        console.log('UPDATE FILE ERROR: ', err.message)
        res.status(500).json({ error: err.message })
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


        // Fetch the newly inserted file from the database
        const [newFileRows] = await pool.query(
            'SELECT * FROM file_registry WHERE id = ?',
            [result.insertId]
        );

        // Return the full file object
        res.status(201).json(newFileRows[0]);

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

// function to mark a file as returned
const fileReturned = async (req, res, next) => {

    try {
        // get the Id of the file
        const { name } = req.body

        // update command
        const updateCommand= `
            UPDATE file_registry
            set status = "Available"
            WHERE name = ?
        `
        // Update the status of teh file in the file in the file_registry table
        const [result] = await pool.query(updateCommand, [name])

        if (result.affectedRows === 0) {
            // if not rows have been affected, send a 400
            return res.status(400).json({ message: 'File status not updated.' })
        }

        // Delete the file from the files_taken table

        // delete command
        const deleteCommand = `
            DELETE FROM files_taken
            WHERE file_name = ?
        `
        
        const [deletedRows] = await pool.query(deleteCommand, [name])
        

        // if no rows have been affected, send a 404
        if (deletedRows.affectedRows === 0) {
            return res.status(400).json({ message: 'No Row deleted' })
        }


        // insert the information in the notifications table
        const notificationsCommand = `
            INSERT into notifications (name, type, notification_text)
            VALUES (?, ?, ?)
        `

        // insertion query
        await pool.query(notificationsCommand, [name, 'info', `File ${name} returned`])

        // send a success message marking the file as returned
        res.status(201).json({ message: 'File Returned' })

    } catch (err) {
        console.error(err.message)
        next(err)
    }
}


// function to deletea  file
const archiveFile = async (req, res, next) => {

    // extract id from the url
    const { id } = req.params

    const { name } = req.user

    try {
        const now = new Date();

        const date_archived = now.toISOString().split('T')[0]; // "2025-11-07"
        const time_archived = now.toTimeString().split(' ')[0]; // "13:10:51"

        // Get the result of all the affected rows
        const [rows] = await pool.query(
            'SELECT * FROM file_registry WHERE id = ?',
            [id]
        )
        
        // if the row is empty, return a 404
        if (rows.length === 0) {
            return res.status(404).json({ message: 'File row empty' })
        }

        const file = rows[0]
        
        // insert the file into the archives table
        
        // insertion command
        const insertionCommand = `
            INSERT INTO archives (file_name, department, date_archived, time_archived, status)
            VALUES (?, ?, ?, ?, ?)
        `

        // query the table to insert the file
        const [result] = await pool.query(insertionCommand, [
            file.name,
            file.department,
            date_archived,
            time_archived,
            "Archived"
        ])


        // if there are no affected rows
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'No file inserted' })
        }

        // Delete the file from the file_registry table
        await pool.query('DELETE FROM file_registry WHERE id = ?', [id])

        // insert the information in the notifications table
        const notificationsCommand = `
            INSERT into notifications (name, type, notification_text)
            VALUES (?, ?, ?)
        `

        // insertion query
        await pool.query(notificationsCommand, [name, 'info', `File ${file.name} archived`])

        // Otherwise, post a success message which shows that the file was deleted successfully
        res.status(200).json({ message: 'File Archived successfully.' })

    } catch (err) {
        console.log('ERROR ARCHIVING FILE: ',err)
        next(err) // send real errors to the logger
    }
}


// function to unarchive a file
const unArchiveFile = async (req, res, next) => {
  const { id } = req.params;

  const { name } = req.user

  try {
    const now = new Date();
    const date_uploaded = now.toISOString().split('T')[0];
    const time_uploaded = now.toTimeString().split(' ')[0];

    // Get the file from archives
    const [rows] = await pool.query('SELECT * FROM archives WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'File not found in archives.' });
    }

    const file = rows[0];

    // Insert it back into the file_registry
    const insertionCommand = `
      INSERT INTO file_registry (name, department, date_uploaded, time_uploaded, status)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(insertionCommand, [
        file.file_name,
        file.department,
        date_uploaded,
        time_uploaded,
        'Available',
    ]);

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'File not restored.' });
    }

    // Delete it from archives
    await pool.query('DELETE FROM archives WHERE id = ?', [id]);

    // insert the information in the notifications table
    const notificationsCommand = `
        INSERT into notifications (name, type, notification_text, category)
        VALUES (?, ?, ?, ?)
    `

    // insertion query
    await pool.query(notificationsCommand, [name, 'info', `File ${file.file_name} unarchived`, 'unarchived'])

    res.status(200).json({ message: 'File unarchived successfully.' });


  } catch (err) {
    console.error('ERROR RESTORING FILE:', err);
    res.status(500).json({ message: 'Error restoring file.' });
    next(err);
  }
};



// function to get all archived files
const getArchivedFiles = async (req, res, next) => {

    try {

        // query the data base
        const [rows] = await pool.query(`SELECT * FROM archives`)
        
        // respond with the archived files
        res.json(rows)

        // if the rows are empty respond with a 4040 meaning that no data has been found
        if (rows.length === 0) {
            return res.status(404).json({ message: "No Archived Files Found" })
        }

        res.status(200).json({ message: 'Archived Files Fetched sucessfully.' })

    } catch (err) {
        console.log(`ERROR: `, err)
        res.status(500).json({ message: 'ERROR FETCHING ARCHIVED FILES.' })
        next(err)
    }
}



// Export the two functions
module.exports = { 
    getAllFiles, 
    getAllFilesTaken, 
    // getAllTrackedFiles,
    archiveFile,
    updateFile,
    addFile,
    fileReturned,
    getArchivedFiles,
    unArchiveFile
}






