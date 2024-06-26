import { Router } from "express";
import * as controller from "../controllers/view.controllers.js";

const router = Router();

router.get("/", controller.home);
 
router.get("/realtimeproducts", controller.realTimeProducts);

export default router;