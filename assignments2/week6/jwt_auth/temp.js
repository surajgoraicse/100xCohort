const jwt = require("jsonwebtoken")
const clipboard = require("clipboardy")

const text = "i love india"

async function copyText() {
    await clipboard.write(text)
}
copyText()

const jwtsecret = "somerandomjwtsecret"
function generateToken(data) {
    const token = jwt.sign(data, jwtsecret  )
    return token
}


const data = {
    username: "suraj",
    password : "21323dfdf"
}