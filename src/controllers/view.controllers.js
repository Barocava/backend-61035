import * as service from "../services/cart.services.js";

export const home = async (req, res, next) => {
    try {
        let carrito = await service.getAllCarts();
        res.render('home', {carrito, layout: 'main.handlebars'});
      } catch (error) {
        next(error.message);
      }
};

export const realTimeProducts = async (req, res, next) => {
    try {
        let carrito = await service.getAllCarts();
        res.render('realTimeProducts', {carrito, layout: 'main.handlebars'});
      } catch (error) {
        next(error.message);
      }
};