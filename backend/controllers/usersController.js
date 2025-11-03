// Get the pool from the db
const pool = require('../database/db')

// function to get all the users
const getAllUsers = async (req, res, next) => {

    try {
        // Destructure to get the rows from the pool
        const [rows] = await pool.query('SELECT * FROM users')
        // console.log(rows)
        res.json(rows)

    } catch (err) {
        // catch the error with a status 500 meaning that there is somthing wrong with teh server side
        res.status(500).json({ error: err.message }) // Error in json format
        next()
    }

}

// function to delete all users
const deleteUser = async (req, res, next) => {
    
    // We delete using the id

    // extract the id from the url
    const { id } = req.params

    try {
        // Check if user exists in the database

        // Destructure to get the rows from the pool
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id])

        // if the result are empty, notify the user that there are no users( databse is empty)
        if (result.affectedRows === 0) return res.status(404).json({ message: "No users Found" })
        
        // post a success message stating that the deletion was succesful
        res.status(200).json({ message: "User Deleted successfully" })

    } catch (err) {
        console.log("ERROR DELETING USER: ", err)
        res.status(500).json({ error: err.message });
        next(err)
    }
}


// function to edit a users details
const editUser = async (req, res, next) => {

    try {
        // Get the user id
        const { id } = req.params

        // Get the users info from the request body
        let { name, email, password, role, department, status } = req.body

        // sql command to update the user
        const [result] = await pool.query(
            `
                UPDATE users
                SET name = ?, email = ?, password = ?, role = ?, department = ?
                WHERE id = ?
            `,
            [name, email, password, role, department, status, id]
        )
        
        // if no rows have been affected
        if (result.affectedRows === 0) {
            // return a message the user that the edited user has not been found
            return res.status(404).json({ message: "User Not Found." })
        }

        // if the edit was successful, inform the user
        res.status(200).json({ message: "User Edited successfully." })


    } catch (err) {
        console.error("UPDATE USER ERROR: ", err.message)
        next(err)
    }
}


// export the function
module.exports = { getAllUsers, deleteUser, editUser }

