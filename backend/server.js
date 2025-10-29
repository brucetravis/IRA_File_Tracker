// import the express library
const express = require('express')
// install the cors library to handle cross originrequest sharing
const cors = require('cors')
const pool = require('./database/db')
// import the logger to listen for success events
const logger = require('./middleware/loggers/logger')
// import the errorHandler to listen for errors
const errorLogger = require('./middleware/loggers/errLogger')
// Get the fileRoutes
const fileRoutes = require('./routes/fileRoutes')
// import the users Routes
const usersRoutes = require('./routes/usersRoutes')
// import the authController
const authRoutes = require('./routes/authRoutes')
// import the general routes
const generalRoutes = require('./routes/generalRoutes')

const cookieParser = require('cookie-parser')

// Create an instance for the express library
const app = express()
// Port to listen from
const PORT = 5000

// MIDDLEWARE
app.use(cors())
app.use(logger)
app.use(express.json())
app.use(cookieParser())


// ✅ Create users table if it doesn’t exist
const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    department VARCHAR(255),
    refreshToken VARCHAR(100),
    role VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Inactive'
  )
`;

async function userDB() {
    try {
        await pool.query(createUserTable)
        console.log("✅ User Table Ready.")
        
    } catch (err) {
        console.log("❌ ERROR creating teh users Table: ", err)
    }
}

userDB()


// prefix all routes with 'api' before the route
app.use('/iraAPI', authRoutes)
app.use('/iraAPI', fileRoutes)
app.use('/iraAPI', usersRoutes)
app.use('/iraAPI', generalRoutes)


// ROUTES
app.get('/', (req, res) => {
    res.send('IRA FILE TRACKER BACKEND IS RUNNING')
})


app.get('/login', (req, res) => {
    res.send('Login page ready.')
})


app.get('/api/dashboard', (req, res) => {
    console.log('This is the dashboard page')
    res.send('This is the dashboard page')
})


app.get('/api/audit', (req, res) => {
    console.log('AUDIT PAGE READY')
    res.send('AUDIT PAGE READY')
})


app.get('/api/filesreturned', (req, res) => {
    console.log('Files Returned Page.')
    res.send('Files Returned Page.')
})

app.get('/api/notifications', (req, res) => {
    console.log('Notiffications Page.')
    res.send('Notiffications Page.')
})


app.get('/api/registration', (req, res) => {
    console.log('Registration Page')
    res.send('Registration Page')
})

app.get('/api/reports', (req, res) => {
    console.log('My reports will be here')
    res.send('My reports will be here')
})


app.get('/api/retention', (req, res) => {
    console.log('RETENTION PAGE.')
    res.send('RETENTION PAGE.')
})


app.get('/api/settings', (req, res) => {
    console.log('Settings Page')
    res.send('Settings Page')
})


app.get('/api/uploadfile', (req, res) => {
    console.log('Uploading file Now')
    res.send('Uploading file Now')
})



app.get(/.*/, (req, res) => {
    res.send('Page not available.')
})

app.post(/.*/, (req, res) => {
    res.send('Page not available.')
})

app.use(errorLogger) // Log all errors

// START LISTENING
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})

