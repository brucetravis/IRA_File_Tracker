// import the error listener
const errEvents = require('../../events/errEvents')

// function to listen for errors
const errorLogger = (err, req, res, next) => {
    // user
    const user = req.body?.name || 'system'
    // eventType
    const eventType = `REQUEST_${req.method}`
    // message
    const message = `
        ${err.name}: ${err.message}
        METHOD:${req.method}
        URL: ${req.url}
        BODY: ${JSON.stringify(req.body)}
    `

    errEvents.emit('error', message, eventType, user)

    res.status(500).json({ error: err.message })

}

// export the error logger
module.exports = errorLogger