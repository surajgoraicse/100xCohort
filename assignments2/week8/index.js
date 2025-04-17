const expres = require('express')
require('dotenv').config()
const cors = require('cors')

const PORT = process.env.PORT || 3000
const app = expres()
app.use(cors())


// import rotuers 




app.use('/user' , )





app.post('/purchase', (req, res) => [
    
])

app.get('/allCourse', (req, res) => [
    
])

app.get('/allPurchasedCourses', (req, res) => [
    
])

app.listen(PORT, () => {
    console.log(`server is listening at http://localhost:${PORT}`);
})