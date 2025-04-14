const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const morgan = require("morgan")

/**
 *  
        {
            "username": "surajg",
            "password": "fsdfsdf"
        },
        {
            "username": "sdfsdfsd",
            "password": "fsdfsdf"
        },
        {
            "username": "werdf",
            "password": "fsdfsdf"
        },
        {
            "username": "werdf",
            "password": "xcvxv"
        },
        {
            "username": "suraj",
            "password": "xcvxv"
        },
        {
            "username": "surajgoria",
            "password": "xcvxv"
        },
        {
            "username": "surajgorai",
            "password": "xcvxv"
        },
        {
            "username": "surajgoraicse",
            "password": "xcvxv"
        }
 */


// middleware for authorization : validating token
const auth = (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        res.status(400).json({ message: "token not found" })
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].token === token) {
            req.user = users[i]
            next()
        }
    }
    res.status(400).json({ message: "user not found, please singin" })
}


const port = process.env.PORT
const users = []

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

function generateToken() {
    return Math.floor(Math.random() * 10e8).toString()
}

app.post('/signup', (req, res) => {
    const { username, password } = req.body

    const found = users.find((user) => {
        if (user.username === username) return true
    })

    if (username.length < 5 || password.length < 5) {
        res.send({ message: "length of the username and password should be greater than equal to 5" })
        return
    }
    if (found) {
        res.status(400).send({ message: "username already exists" })
        return
    }
    users.push({ username, password })
    res.send({ message: "user created successfully" })
})

app.post('/signin', (req, res) => {
    const { username, password } = req.body
    console.log(username, password);

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            const token = generateToken()
            users[i].token = token
            res.status(200).cookie("token", token).json({ message: "user logged in successfully" })
            return;
        }
    }
    res.send({
        message: "username and passoword not found, signup first"
    })
})
app.get("/all", (req, res) => {
    res.status(200).json({
        message: "list of all users",
        users: users
    })
})




app.get('/', auth, (req, res) => {
    res.send({ data: "this is a data ", user: req.user })
})
app.get("/me", (req, res) => {
    const token = req.cookies.token
    const user = users.find((user) => {
        if (user.token === token) {
            return true
        }
    })
    if (!user) {
        return res.status(400).json({message : "user not found"})
    }
    return res.status(200).send({user})
})


// middleware for handling undefined routes
app.use((req, res) => {
    res.status(404).json({
        message: "route not found"
    })
})


app.listen(port, () => {
    console.log(`server is listening at "  http://localhost:3000`);
})