import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// database connection
import connectDb from "./database/db.js";
const DB_URI = process.env.DB_URI;
connectDb(DB_URI!);

// express config
const PORT = process.env.PORT || 8001;
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// import rotuers
import userRouter from "./routes/user.router.js";
import courseRouter from "./routes/course.router.js";

// using the routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);

app.listen(PORT, () => {
	console.log(`server is listening at http://localhost:${PORT}`);
});
