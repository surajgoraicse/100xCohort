const express = require("express");
const dotenv = require("dotenv");
const {connectDb} = require("./database/index")
dotenv.config();


connectDb()
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/healthy", (req, res) => res.send("I am Healthy"));

//  start writing your routes here

app.listen(port, () => console.log(`server is running at http://localhost:${port}`));

