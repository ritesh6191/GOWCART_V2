import express from "express";
import dbConnect from "./db/dbConf.js";
import userRouter from "./routers/user.route.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import cowRouter from "./routers/cow.route.js";
import retriveRouter from "./routers/retrive.route.js";
import postRouter from "./routers/post.route.js";



dotenv.config({
    path: './env'
});


const app = express();
const port = process.env.PORT || 3000;
//const upload = multer();

app.use(cors({
    origin: ["http://localhost:5173","http://192.168.0.107:5173", "https://192.168.245.146:5173","https://192.168.180.145:5173"],
    credentials: true,
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



dbConnect();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/user", userRouter);
app.use("/sell", cowRouter);
app.use("/get", retriveRouter)
app.use("/post", postRouter)


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
