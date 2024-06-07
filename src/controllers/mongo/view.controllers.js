import * as service from "../../services/mongo/cart.services.js";
import * as servicep from "../../services/mongo/product.services.js";

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
      let carritos = await servicep.getAll();
      let asd = JSON.stringify(carritos.docs);
      let asd2 = JSON.parse(asd);
      console.log(asd2);
      res.render('productsViewPage', {asd2, layout: 'main.handlebars'});
    } catch (error) {
      next(error.message);
    }
}; 

export const cartsView = async (req, res, next) => {
  try {
      const { cid } = req.params;
      //let asd = await service.getById(cid);
      let carrito = await service.getById(cid);
      //let carrito = JSON.parse(JSON.stringify(asd));
      //console.log(carrito._id);
      res.render('cartsViewPage', {carrito, layout: 'main.handlebars'});
    } catch (error) {
      next(error.message);
    }
}; 