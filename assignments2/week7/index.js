const mongoose = requier("mongoose")
const express = require("express")
require('dotenv').config()


const { UserModel, TodoModel } = require("./db.js")

const app = express()

app.use(express.json())
const port = process.env.PORT
app.post("/signup", async (req, res) => {
    const name = req.body.name
    const password = req.body.password
    const email = req.body.email


    const user = await UserModel.create(
        {
            name, password, email
        }
    )
    if (!user) {
        return res.json({
            message: "user creation failed"
        })
    }

    return res.json({
        message: "user registered successfully"
    })

})

app.post("/login", (req, res) => {
    
})

app.post("/todo", (req, res) => {

})

app.get("/todos", (req, res) => {

})


app.listen(port, () => {
    console.log("server is listening at port " + port);
})


