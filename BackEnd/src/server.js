import express from "express";
import dbConnect from "./db/dbConf.js";
import userRouter from "./routers/user.route.js";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
import cowRouter from "./routers/cow.route.js"



dotenv.config({
    path: './env'
});


const app = express();
const port = process.env.PORT || 3000;
const upload = multer();

//app.use(upload.any());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



dbConnect();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/user", userRouter);
app.use("/sell", cowRouter);


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
