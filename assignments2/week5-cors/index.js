const express = require("express")

const app = express()

app.use(express.json())
app.use(express.static("./public" ))

// app.use((req, res, next) => {
//     console.log("request : " + req.method);
// })
app.get('/', (req, res) => {
    res.send("hi")
})

app.post('/sum', (req, res) => {
    console.log("request made : ". req.method);
    const a = parseInt(req.body.a)
    const b = parseInt(req.body.b)
    res.json({
        sum : a+b
    })
})


app.listen(3000, () => {
    console.log("app is listening at port 3000");
})