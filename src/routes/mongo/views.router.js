import { Router } from "express";
import * as controller from "../../controllers/mongo/view.controllers.js";

const router = Router();

router.get("/", controller.home);

router.get("/products", controller.productsView);
router.get("/carts/:cid", controller.cartsView);
router.get("/realtimeproducts", controller.realTimeProducts);

router.get("/login", controller.login);
router.get("/register", controller.register);
router.get("/profile", controller.profile);

export default router;