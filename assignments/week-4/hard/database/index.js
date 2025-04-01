const mongoose = require('mongoose');

// Connect to MongoDB

const connectDb = async () => {
    mongoose
        .connect("mongodb://admin:password@mongo:27017/taskify?authSource=admin")
        .then((db) => {
            console.log("Database connected successfully : ", db.connection.host);
        })
        .catch((err) => {
            console.log("database connection error : ", err);
            process.exit(1)
        })
}


// Define schemas


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true });

const TodoSchema = new mongoose.Schema({
    // Schema definition here
    title: {
        type: String,
        max: 30,
        required: true,
        trim: true
    },
    description: {
        type: String,
        max: 80,
        required: true,
        trim: true
    },
});

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    User,
    Todo,
    connectDb

}