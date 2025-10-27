const pool = require('./db');

// (async () => {
//     try {
//         const [rows] = await pool.query('SELECT 1+1 AS result')
//         console.log('DB test OK: ', rows[0])
//         process.exit(0)

//     } catch (err) {
//         console.error(`DB test Failed: ${err.message}`)
//     }
// })();


// Select data
// (async () => {
//     try {
//         // get all users
//         const [rows, fileds] = await pool.query('SELECT * FROM users')
//         console.log('USERS')
//         console.log(Object.keys(rows[0]))
//         // console.log(Object.keys(rows[3]))
//         console.log(fileds.map(f => f.name))
//         rows.forEach(row => {
//             console.log(`\n${row.id}, ${row.name}, ${row.Age}, ${row.Occupation}, ${row.SALARY}, ${row.period}`)
//         })
        
//         process.exit(0)

//     } catch(err) {
//         console.error('Select failed: ', err.message)
//     }
// })();

// // Insert Data
// (async () => {
//     try {
//         const [result] = await pool.query(
//             'INSERT INTO users (id, name, Age, Occupation, SALARY, period ) VALUES (?, ?, ?, ?, ?, ?)',
//             [7, 'Danny', 20, 'Student', 10000, 1]
//         );

//         console.log('Inserted with ID: ', result.insertId)
//     } catch (err) {
//         console.error()
//     }

// })();

(async () => {
    try {
        const [result] = await pool.query(
            'INSERT INTO users (id, name, Age, Occupation, SALARY, period) VALUES(?, ?, ?, ?, ?, ?)',
            [7, 'Danny', 20, 'Student', 10000, 1]
        )

        console.log(`Inserted with Id ${result.insertId}`)

        // query all the row values
        const [rows, field] = await pool.query('SELECT * FROM users')
        // Log the table titles
        // console.log(Object.keys(rows[0]))
        field.map(f => f.name)
        // Loop throught all the row values to display them
        rows.forEach(row => {
            console.log(row.id, row.name, row.Age, row.Occupation, row.SALARY, row.period)
        })
        

    } catch(err) {
        console.error(`ERROR: ${err.message}`)
    }
})();

