import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { deleteAnimal, editAnimal } from "../controllers/post.controller.js";

const router = Router();

router.route('/delete/:type/:id').post(verifyJWT, deleteAnimal);

router.route('/edit/:type/:id').put(verifyJWT, editAnimal);

export default router;