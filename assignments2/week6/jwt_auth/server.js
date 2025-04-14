const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const morgan = require("morgan")
const jwt = require("jsonwebtoken")

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




const port = process.env.PORT
const jwtSecret = process.env.JWT_SECRET || "jwtsecret"
const users = []


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))


const auth = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(400).json({ message: "token not found" })
    }
    const verifyJwt = jwt.verify(token, jwtSecret)
    if (!verifyJwt) {
        return res.status(400).json({ message: "token invalid" })
    }
    req.user = verifyJwt
    next()
}

function generateToken(data) {
    const token = jwt.sign(data, jwtSecret || )
    return token
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

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            const token = generateToken({ username })
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
    console.log(token);

    const verifyJwt = jwt.verify(token, jwtSecret)



    if (!verifyJwt) {
        return res.status(400).json({ message: "user not found" })
    }
    return res.status(200).send({ verifyJwt })
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