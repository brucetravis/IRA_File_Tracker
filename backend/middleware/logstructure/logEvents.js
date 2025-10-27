// Destructure the format function from the imported date-fns module
const { format } = require('date-fns')
// import the v4 version of uuid()
const { v4: uuid } = require('uuid')
// import the file system module 
const fs = require('fs')
// import the promises version of file system
const fsPromises = require('fs').promises
// import thr path module
const path = require('path')


// function to log events
const logEvents = async (message, eventType, user='system') => {
    
    // Get the current date
    const date = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    // structure of the log
    const logItem = `${date}\t${uuid()}\t[${eventType}]\t${message}\t${user}\n`


    try {
        // if the logs folder does not exit
        if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
            // create the folder
            await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'))
        }

        // Nevertheless, append to a file in the folder
        await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs', 'reqLogs.txt'), logItem)
            
    } catch (err) {
        console.log(`ERROR: ${err.message}`)
    }

}


// export the function
module.exports = logEvents


