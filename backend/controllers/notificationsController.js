// Get the pool from the db
const pool = require("../database/db")

// function to get all the notifications
const getAllNotifications = async (req, res, next) => {

    try {
        // get command
        const getCommand = `
            SELECT * FROM notifications
        `
        
        // query the database to get all notifications
        const [rows] = await pool.query(getCommand)
        // respond with all the rows
        res.json(rows)

    } catch (err) {
        // respond with a 500 server error
        res.status(500).json({ message: 'ERROR GETTING NOTIFICATIONS.' })
        console.log('ERROR GETTING NOTIFICATIONS: ', err)
        next(err)
    }
}



// function to mark a notification as read
const markNotAsRead = async (req, res, next) => {

    try {
        // get the notification id from the request body
        const { id } = req.params

        // Update the is_read status
        const updateResult = await pool.query(`UPDATE notifications SET is_read = "read" WHERE id = ?`, [id])

        // if not rows are affected return a 404
        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: 'Notification Not Found.' })
        }

        // Return the updated notification
        const [updatedRows] = await pool.query(
        `SELECT * FROM notifications WHERE id = ?`,
        [id]
        );

        res.json(updatedRows[0]);

        // Delete the notification from the notifiation table in the database
        const [result] = await pool.query('DELETE FROM notifications WHERE id = ?', [id])

        // if not rows are affected return a 404
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Notification Not Found.' })
        }

        res.status(201).json({ message: 'Notification Read.' })
        

    } catch (err) {
        console.log('ERROR MARKING AS READ: ', err)
        res.status(500).json({ message: 'Notification Not Read Server error.' })
        next(err)
    }

}


// export teh controller
module.exports = {
    getAllNotifications, markNotAsRead
}