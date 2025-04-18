const mongoose = require("mongoose")


const connectDb = async (DB_URI) => {
    try {
        const db = await mongoose.connect(DB_URI, { dbName: "coursera" })
        console.log("database connected successfully : ", db.connection.host);
    } catch (error) {
        console.log('database connection failed : ', error);
        process.exit(1)
    }
}

module.exports  = connectDb