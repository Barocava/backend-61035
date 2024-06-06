import * as service from "../services/cart.services.js";

export const createCart = async (req, res, next) => {
    try {
        const response = await service.createCart();
        res.json(response);
      } catch (error) {
        next(error.message);
      }
};

export const getAllCarts = async (req, res, next) => {
    try {
        res.json(await service.getAllCarts());
      } catch (error) {
        next(error.message);
      }
};

export const getCartById = async (req, res, next) => {
    try {
        const { cid } = req.params;
        let response = await service.getCartById(cid)
        response ? 
            res.json(response) :
            res.json({msg:"No existe ese carrito"});
      } catch (error) {
        next(error.message);
      }
};

export const saveProductToCart = async (socket, req, res, next) => {
    try {
        const { pid } = req.params;
        const { cid } = req.params;
        const response = await service.saveProductToCart(cid, pid);
        const carrito = await service.getAllCarts();
        socket.broadcast.emit("message",carrito);
        res.json(response);

      } catch (error) {
        next(error.message);
      }
};