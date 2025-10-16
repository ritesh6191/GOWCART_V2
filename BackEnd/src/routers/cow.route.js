import { upload } from "../middlewares/multer.middleware.js"
import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { sellBuffallo, sellCow, sellGoat, sellHorse } from "../controllers/cow.controller.js";

const router = Router();

router.route("/cow").post(upload.fields([{
    name: "CowImage1",
    maxCount: 1
    },
{
    name: "CowImage2",
    maxCount: 1
    }
]), verifyJWT, sellCow)

router.route("/buffallo").post(upload.fields([{
    name: "BuffImage1",
    maxCount: 1
    },
{
    name: "BuffImage2",
    maxCount: 1
    }]), verifyJWT, sellBuffallo)

router.route("/goat").post(upload.fields([{
    name: "GoatImage1",
    maxCount: 1
    },
{
    name: "GoatImage2",
    maxCount: 1
    }]), verifyJWT, sellGoat)    

router.route("/horse").post(upload.fields([{
    name: "HorseImage1",
    maxCount: 1
    },
{
    name: "HorseImage2",
    maxCount: 1
    }]), verifyJWT, sellHorse)

export default router;