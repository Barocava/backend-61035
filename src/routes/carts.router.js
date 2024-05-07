import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router();

const cartManager = new CartManager(`./data/carts.json`);

router.post("/:cid/product/:pid", async (req, res, next) => {
   try {
      const { pid } = req.params;
      const { cid } = req.params;
      const response = await cartManager.saveProductToCart(cid, pid);
      res.json(response)
   } catch (error) {
    next(error)
   }
});

router.post("/", async (req, res, next) => {
  try {
    const response = await cartManager.createCart();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:cid", async (req, res, next) => {
  try {
    const {cid} = req.params
    res.json(await cartManager.getCartById(cid))
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
    try {
      res.json(await cartManager.getAllCarts())
    } catch (error) {
      next(error);
    }
  });

export default router;