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

// Create an instance for the express library
const app = express()
// Port to listen from
const PORT = 5000

// MIDDLEWARE
app.use(cors())
app.use(logger)
app.use(express.json())


// ROUTES
app.get('/', (req, res) => {
    res.send('IRA FILE TRACKER BACKEND IS RUNNING')
})

// prefix all routes with 'api' before the route
app.use('/iraAPI', fileRoutes)
app.use('/iraAPI', usersRoutes)


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


// app.get('/api/filetracking', (req, res) => {
//     console.log('Tracking all the files here.')
//     res.send('Tracking all the files here.')
// })


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


// app.get('/api/users', async (req, res) => {
//     // console.log('Fetch All users.')
//     // res.send('Fetch All users.')
//     try {
//         const [rows] = await pool.query('SELECT * FROM users')
//         res.json(rows) // send all rows as json

//     } catch (err) {
//         res.status(500).json({ error: err.message})
//     }
// })

app.get(/.*/, (req, res) => {
    res.send('Page not available.')
})

app.use(errorLogger) // Log all errors

// START LISTENING
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})

