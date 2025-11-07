const pool  = require("../database/db")

// function to get all the files
const getAudits = async (req, res, next) => {
    
    try {
        // Destructure to get all the rows
        const [rows] = await pool.query('SELECT * FROM audit')
        // respond in json format
        // res.json(rows)
        res.json(rows)

    } catch (err) {
        console.error('❌ AUDIT QUERY ERROR:', err)
        res.status(500).json({ error: err.message })
        next(err)
    }
}

module.exports = { getAudits }