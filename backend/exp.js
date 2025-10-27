// import the express library
const express = require('express')
// Create the express instance
const app = express()
// import the http library
// const http = require('http')

const PORT = 5000

// app.use(express.urlencoded({ extended: false }))


// app.get('/', (req, res) => {
//     res.send('Hello world!')
// })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})