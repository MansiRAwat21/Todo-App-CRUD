const cors = require('cors')
const body_parser = require('body-parser')


const middleware = [
    // cors(),
    cors({
    origin: "http://localhost:5173", // frontend ka exact URL
    credentials: true, // allow cookies / authorization header
  }),
    body_parser.json(),
    body_parser.urlencoded({ extended: true }),
    (error, req, res, next) => {
        if (error.type === "time-out") {
            return res.status(504).json(error)
        }
        return res.status(400).json({
            message: error.message
        })
    },

    (req, res, next) => {
        res.set('Cache-Control', 'no-store, max-age=0');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    },

]

module.exports = middleware