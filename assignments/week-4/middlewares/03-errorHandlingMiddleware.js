const express = require("express")
const asyncHandler = require("./asyncHandler.util")
const app = express()

app.get('/', (req, res) => {
    res.send("hello")

})
let errorCount = 0

app.get('/data', asyncHandler((req, res, next) => {
    throw new Error("this is a custom error")
    res.send(length.toString())
}))


app.use((err, req, res, next) => {
    console.log("something went wrong : ", err);
    res.status(404).send(`something went wrong    ${err}`)
})


app.listen(4000, () => {
    console.log("server is listening at port 4000");
})