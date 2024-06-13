import { Router } from "express";
const router = Router();
import * as controller from "../../controllers/mongo/user.controller.js";
import { validateLogin } from "../../middlewares/validateLogin.js";

router.post("/login", controller.login);
router.post('/register', controller.register)
router.get("/info", validateLogin, controller.infoSession);
router.get("/secret-endpoint", validateLogin, controller.visit);
router.post("/logout", controller.logout);

export default router;
