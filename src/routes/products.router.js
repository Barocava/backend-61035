import { Router } from "express";
import productsValidator from "../middlewares/products.validator.js";
import * as controller from "../controllers/product.controllers.js";

const router = Router();

router.get("/", controller.getProducts);

router.get("/:id", controller.getProductById);

router.get("/code/:code", controller.getProductByCode);

router.post("/", [productsValidator], controller.addProduct);

router.put("/:id", controller.updateProduct);
  
router.delete("/:id", controller.deleteProduct);
  
export default router;