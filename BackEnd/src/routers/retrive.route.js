import { Router } from "express";
import { getAllAnimals, getAnimalById, getNearbyAnimals } from "../controllers/retrive.controller.js";

const router = Router();

router.route("/allAnimals").post(getAllAnimals)

router.route('/animal/:type/:id').get(getAnimalById)

router.route('/nearbyAnimals').post(getNearbyAnimals)

export default router;