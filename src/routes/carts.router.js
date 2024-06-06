import { Router } from "express";
import * as controller from "../controllers/cart.controllers.js";

const cartsRouterSocket = (socket) => {
  const router = Router();

  router.get("/",controller.getAllCarts);
  /*router.get("/", async (req, res, next) => {
    try {
      res.json(await cartManager.getAllCarts());
    } catch (error) {
      next(error);
    }
  });*/

  router.post("/",controller.createCart);
  /*router.post("/", async (req, res, next) => {
    try {
      const response = await cartManager.createCart();
      res.json(response);
    } catch (error) {
      next(error);
    }
  });*/

  router.get("/:cid",controller.getCartById);
  /*router.get("/:cid", async (req, res, next) => {
    try {
      const { cid } = req.params;
      res.json(await cartManager.getCartById(cid));
    } catch (error) {
      next(error);
    }
  });*/

  router.post("/:cid/product/:pid",async (req, res, next) => {
    controller.saveProductToCart(socket,req, res, next);
  });
  /*router.post("/:cid/product/:pid", async (req, res, next) => {
    try {
      const { pid } = req.params;
      const { cid } = req.params;
      const response = await service.saveProductToCart(cid, pid);
      const carrito = await cartManager.getAllCarts();
      socket.broadcast.emit("message",carrito);
      res.json(response);
    } catch (error) {
      next(error);
    }
  });*/

  return router;
};
export default cartsRouterSocket;

//export default router;
