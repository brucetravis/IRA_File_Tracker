// Destructure the format from the date-fns module
const { format } = require('date-fns')
// import the file system module
const fs = require('fs')
// import the file system module with promises
const fsPromises = require('fs').promises
// impor the path module
const path = require('path')


// log structure 
const errorLogEvents = async (message, eventType, user='system') => {
    // Get the date 
    const date = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    // The error structure
    const errorItem = `${date}\t[${eventType}]\t${message}\t${user}\n`

    try {
        // if the logs folder does not exist, create it
        if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'))
        }

        // Nevertheless, append to the error logs file
        await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs', 'errLog.txt'), errorItem)

    } catch (err) {
        console.log('ERROR: ', err)
    }
}


// export the structure
module.exports = errorLogEvents