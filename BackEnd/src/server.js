import express from "express";
import dbConnect from "./db/dbConf.js";
import userRouter from "./routers/user.route.js";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config({
    path: './env'
});


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


dbConnect();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/user", userRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
