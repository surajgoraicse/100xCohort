const express = require('express')
require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require("cookie-parser")


// database connection 
const connectDb = require("./database/db")
const DB_URI = process.env.DB_URI
connectDb(DB_URI)


// express config
const PORT = process.env.PORT || 8001
const app = express()
app.use(cors())
app.use(morgan("dev"))
app.use(cookieParser())


// import rotuers 
const userRouter = require("./routes/user.router")
const courseRouter = require("./routes/course.router")





// using the routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/course', courseRouter)






app.listen(PORT, () => {
    console.log(`server is listening at http://localhost:${PORT}`);
})