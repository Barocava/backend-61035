import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router();

const cartManager = new CartManager(`./data/carts.json`);

router.get("/", async (req, res,next)=>{
  let carrito = await cartManager.getAllCarts();
  res.render('home', {carrito});
})
 
router.get("/realtimeproducts", async (req, res,next)=>{
  let carrito = await cartManager.getAllCarts();
  res.render('realtimeproducts', {carrito});
})

export default router;