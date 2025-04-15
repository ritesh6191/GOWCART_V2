import { Router } from "express";
import { getAllAnimals, getAnimalById } from "../controllers/retrive.controller.js";

const router = Router();

router.route("/allAnimals").post(getAllAnimals)

router.route('/animal/:type/:id').get(getAnimalById)

export default router;