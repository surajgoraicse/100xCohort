import { Router } from "express";

const app = Router();

app.post("/signup", (req, res) => {});

app.post("/signin", (req, res) => {});

app.get("/", (req, res) => {
	res.send("this is some data");
});

export default app