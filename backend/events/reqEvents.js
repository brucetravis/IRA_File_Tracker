// Listener for the events log

// import the logEvents structure
const logEvents = require('../middleware/logstructure/logEvents')

// import the events module
const { EventEmitter } = require('events')

// create a custom class for the events
class MyEmitter extends EventEmitter {}

// create an instance of the events
const reqEmitter = new MyEmitter()


// listener for the events class
reqEmitter.on('log', (msg, eventType, user) => logEvents(msg, eventType, user))


// export the listener
module.exports = reqEmitter
