const mongo = require('mongoose')

const connectionInstance = async () => {
    try {
        await mongo.connect(process.env.MONGO_URI)
        console.log('MONGO DB CONNECT SUCCESSFULLY')        
    } catch (error) {
        console.log('SERVER IS NOT CONNECTED')
        setTimeout(()=> process.exit(1), 2000)        
    }

}
module.exports = {connectionInstance}