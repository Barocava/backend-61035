import * as service from "../../services/mongo/cart.services.js";

export const home = async (req, res, next) => {
    try {
        let carrito = await service.getAll();
        res.render('home', {carrito, layout: 'main.handlebars'});
      } catch (error) {
        next(error.message);
      }
};

export const realTimeProducts = async (req, res, next) => {
    try {
        let carrito = await service.getAll();
        res.render('realTimeProducts', {carrito, layout: 'main.handlebars'});
      } catch (error) {
        next(error.message);
      }
};


export const productsView = async (req, res, next) => {
  try {
      let carritos = await service.getAll();
      console.log(carritos);
      res.render('productsViewPage', {carritos, layout: 'main.handlebars'});
    } catch (error) {
      next(error.message);
    }
}; 
