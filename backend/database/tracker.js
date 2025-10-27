const pool = require('./db');

(async () => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM users')
        // console.log(Object.keys(rows[0]))
        fields.map(f => f.name)
        rows.forEach(row => {
            console.log(row.user_id, row.user_name, row.user_phone, row.user_department)
        })

        process.exit(0)

    } catch(err) {
        console.log(`Error: ${err.message}`)
    }
})();