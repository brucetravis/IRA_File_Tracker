// load variables from .env file like (DB_USER, DB_PASS)
require('dotenv').config({ path: __dirname + '/../.env'})

// import the mysql promise version  so that we can use async/await
const mySql = require('mysql2/promise')

// create a connection pool (collection of pre-made database connections)
const pool = mySql.createPool({
    // take the host from .env or default to 'localhost
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'ira_file_tracker',
    waitForConnections: true,
    connectionLimit: 10, // if all connections are busy, new requests wait until one is free
    queueLimit: 0 // No limit to how many requests can waiit in queue

})

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS ? '[HIDDEN]' : '(empty)');
console.log('DB_NAME:', process.env.DB_NAME);


module.exports = pool

