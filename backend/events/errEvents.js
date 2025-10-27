// import the error log structure
const errorLogger = require('../middleware/logstructure/errorLogs')

// import the events module
const { EventEmitter } = require('events')

// create a custom class for the events
class ErrorEmitter extends EventEmitter {}

// create an instance of the events
const errorEmitter = new ErrorEmitter()


// Listen for any errors
errorEmitter.on('error', (msg, eventType, user) => {
    errorLogger(msg, eventType, user)
})


// export the listener
module.exports = errorEmitter