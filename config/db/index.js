const mongo = require('mongoose')
const logger = require('../../src/logger/logger')
const connectionInstance = async () => {
    try {
        await mongo.connect(process.env.MONGO_URI)
        logger.info('MONGO DB CONNECT SUCCESSFULLY')        
    } catch (error) {
        logger.error('SERVER IS NOT CONNECTED')
        setTimeout(()=> process.exit(1), 2000)        
    }

}
module.exports = {connectionInstance}