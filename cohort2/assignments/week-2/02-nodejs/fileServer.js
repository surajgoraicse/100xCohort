/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const fsPromises = require("fs/promises")
const path = require('path');
const app = express();


const filePath = path.join(__dirname, "files")


app.get("/files", async (req, res) => {
  try {
    let files = await fsPromises.readdir(filePath)
    
    console.log(files);

    res.status(200).json(files)


  } catch (error) {
    res.status(500).send("file not found")
  }

})

app.get('/files/:fileName',async (req, res) => {
  try {

    const fileName = req.params.fileName
    if (!fileName) {
      return res.status(404).json({ message: "Provide filename in the params" })
    }

    const filePath = path.join(__dirname, "files", fileName);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "file not found" })
    }

    let data = await fsPromises.readFile(filePath, 'utf-8')

    
    console.log("file data : ", data);
    res.status(200).json(data)

  } catch (error) {
    return res.status(500).end()
  }
})

app.use((req, res) => {
  res.status(404).send("Route not found")
})


if (require.main === module) {
  app.listen(3000, () => {
    console.log("server is listening at port 3000");
  })
}


module.exports = app;