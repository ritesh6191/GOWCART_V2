import { Router } from "express";
import { getFilteredCows } from "../controllers/filter.controller.js";
const router = Router();

router.route('/cow').post(getFilteredCows);

export default router;