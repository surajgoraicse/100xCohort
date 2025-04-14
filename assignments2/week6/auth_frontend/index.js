const express  = require("express")

const app = express()


app.get('/', (req, res) => {
    res.send("this is some data from backend")


})


app.listen(3000, () => {
    console.log("app is listeninga at " + "http://localhost:3000");
})