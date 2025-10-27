// import the listener
const successEventsLogger = require('../../events/reqEvents')


// function to log the events
const logger =  async (req, res, next) => {
    // name of the user
    const user = req.user?.name || req.body?.name || 'system'
    // event type
    const eventType = `REQUEST_${req.method}`
    // message
    const message = `${req.method}\t${req.url}`
    
    // emit the event
    successEventsLogger.emit('log', message, eventType, user)

    // next middleware
    next()
}

// export the logger 
module.exports = logger
