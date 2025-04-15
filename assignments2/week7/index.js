const mongoose = require("mongoose")
const express = require("express")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const cookieParser = require("cookie-parser")

// make database connection 
// create signup , login , and auth route
// use jwt for secrure route. pass usreid in the req object
// create a post todo route which takes some body data and creates a new todo for a specific user.
// create a get todos route for a user to display their todos and for admin user to display all todos


async function connectDb() {
    mongoose
        .connect("mongodb://surajgoraicse:surajgoraicse@localhost:27017?authSource=admin", { dbName: "todo_application" })
        .then((db) => {
            console.log("database connected successfully : ", db.connection.host);
        })
        .catch((err) => {
            console.log("database connection failed : ", err);
            process.exit(1)
        })
}
connectDb()
const { UserModel, TodoModel } = require("./db.js")

const app = express()
app.use(express.json())
app.use(cookieParser())
const port = process.env.PORT
const jwtSecret = "Ilovekrishna"


app.post("/signup", async (req, res) => {
    const name = req.body.name
    const password = req.body.password
    const email = req.body.email


    const user = await UserModel.create(
        {
            name, password, email
        }
    )
    console.log("db user : ", user);
    if (!user) {
        return res.status(400).json({
            message: "user creation failed"
        })
    }

    return res.status(200).json({
        message: "user registered successfully"
    })

})

app.post("/login", async (req, res) => {
    const { name, password } = req.body


    const user = await UserModel.findOne({ name, password })
    console.log("User form the db", user);
    if (user) {

        const token = jwt.sign({ id: user._id }, jwtSecret || "someJwtSecret")
        console.log("genereated jwt ", token);

        return res.status(200).cookie("token", token).json({ message: "signed in successfully" })
    } else {
        return res.status(404).json({ message: "user not found" })
    }

})


const auth = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(400).json({ message: "token not found, please login " })
    }
    const verifiedJwt = jwt.verify(token, jwtSecret || "someJwtSecret", (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: "token invalid, please login " })
        }
        console.log("verified token ", decoded);
        req.userId = decoded.id
        next()
    })

}

app.post("/todo", auth, async (req, res) => {
    const { title, done } = req.body
    const userId = req.userId
    const todo = await TodoModel.create({
        title, done, userId
    })
    const token = req.cookies.token

    console.log("created todo : ", todo);

    if (!todo) {
        return res.status(400).json({ message: "todo creation failed due to server error" })
    }
    else {
        return res.status(200).json({ message: "todo created successfully" })
    }


})

app.get("/todos", auth, async (req, res) => {
    const userId = req.userId
    console.log(userId);

    const todos = await TodoModel.find({ userId })
    return res.status(200).json(todos)
})

app.get("/admin-todos", auth, async (req, res) => {
    const userId = req.userId
    console.log(userId);

    const todos = await TodoModel.find()
    return res.status(200).json(todos)
})


app.listen(port, () => {
    console.log("server is listening at port " + port);
})


