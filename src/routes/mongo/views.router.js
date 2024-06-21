import { Router } from "express";
import * as controller from "../../controllers/mongo/view.controllers.js";
import { validateLogin } from "../../middlewares/validateLogin.js"

const router = Router();

router.get("/", controller.home);

router.get("/products", controller.productsView);
router.get("/carts/:cid", controller.cartsView);
router.get("/realtimeproducts", controller.realTimeProducts);

//router.get("/login", controller.login);
router.get("/register", controller.register);
router.get("/profile", controller.profile);

router.get("/login", (req, res) => {
    res.render("login");
  });
  
  router.get("/profile-github", validateLogin, (req, res) => {
    console.log("req.user", req.user);
    //const user = req.user.toObject();
    const user = req.user;
    res.render("profile", { user });
  });

export default router;