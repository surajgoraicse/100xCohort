const express = require('express')
const path = require('path')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const morgan = require("morgan")
const jwt = require("jsonwebtoken")


/**
 * backend with
 * signup,  signin api
 * signup : takes username and passowrd in body and checks if the user already exists. Then it push it to the global users array after  perfroming some basic validation.
 * signin : takes data usernaem and password the body and then check if the user exists in the global user array. Then it generates a jwt token with the usrename and password and sends a response with status code and token as cookie
 *  auth middleware : takes token from the incoming cookie, verifies it and calls the next() if it is valid
 * generateToken() : genereates a jwt token
 * /all route : returns all the user
 * /me route : returns the details of the existing user. (based on cookie)
*/  

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
const jwtSecret = process.env.JWT_SECRET || "jwtsecret"
const users = []
app.use(morgan("dev"))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname , "/public/index.html"))
})


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
    const token = jwt.sign(data, jwtSecret || "thisisasecret" )
    return token
}


app.post('/signin', (req, res) => {
    const { username, password } = req.body

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            const token = generateToken({ username })
            res.status(200).cookie("token", token).json({ message: "user logged in successfully" })
            return;
        }
    }
    res.status(400).send({
        message: "username and passoword not found, signup first"
    })
})
app.post('/signup', (req, res) => {
    const { username, password } = req.body

    const found = users.find((user) => {
        if (user.username === username) return true
    })

    if (username.length < 5 || password.length < 5) {
        res.status(400).send({ message: "length of the username and password should be greater than equal to 5" })
        return
    }
    if (found) {
        res.status(400).send({ message: "username already exists" })
        return
    }
    users.push({ username, password })
    res.status(200).send({ message: "user created successfully" })
})

app.get("/all", (req, res) => {
    res.status(200).json({
        message: "list of all users",
        users: users
    })
})

app.get("/me", (req, res) => {
    const token = req.cookies.token
    console.log(token);

    const verifyJwt = jwt.verify(token, jwtSecret || "thisisasecret")



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
    console.log("server is listening at port 3000 : http://localhost:3000");
})