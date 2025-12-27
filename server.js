
const express = require('express')
const http = require('http')
const dotenv = require('dotenv')
const middleware  = require('./src/utils/middleware.js')

const cookieParser = require("cookie-parser");
dotenv.config()

const { connectionInstance } = require('./config/db/index.js');
const route = require('./src/routes/user.routes.js');
// const bookroute = require('./src/routes/book.routes.js');
// const todoroute = require('./src/routes/todo.routes.js');
const authRoutes = require("./src/routes/auth.routes");
const bookRoutes = require("./src/routes/book.routes");
const todoRoutes = require("./src/routes/todo.routes");


const app = express()
app.use(cookieParser());


middleware.forEach((m) => app.use(m));
app.use("/api/auth", authRoutes);
app.use("/api", route);
app.use("/api", bookRoutes);
app.use("/api", todoRoutes);
// app.use('/api',middleware, route)
// app.use('/api',middleware, bookroute)
// app.use('/api',middleware, todoroute)

const server = http.createServer(app)

const callingFunction = async () => {
    try {
        await connectionInstance()
        server.listen(process.env.PORT || 8000, '0.0.0.0', () => { console.log(`PORT LISTEN ON ${process.env.PORT}`) })
    } catch (error) {
        console.log(error, 'Error')
    }
}

callingFunction()

