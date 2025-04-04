import { upload } from "../middlewares/multer.middleware.js"
import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { sellCow } from "../controllers/cow.controller.js";

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


export default router;