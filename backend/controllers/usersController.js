// Get the pool from the db
const pool = require('../database/db')

// function to get all the users
const getAllUsers = async (req, res) => {

    try {
        // Destructure to get the rows from the pool
        const [rows] = await pool.query('SELECT * FROM users')
        // console.log(rows)
        res.json(rows)

    } catch (err) {
        // catch the error with a status 500 meaning that there is somthign wrong with teh server side
        res.status(500).json({ error: err.message }) // Error in json format
    }

}


// export the function
module.exports = { getAllUsers }

