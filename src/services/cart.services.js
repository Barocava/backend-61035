import {__dirname} from '../utils.js';
import CartManager from '../daos/filesystem/cart.dao.js';

const cartDao = new CartManager(`${__dirname}\\data\\carts.json`);

export const createCart = async () => {
    try {
        let response = await cartDao.createCart();
        response ? 
            console.log(`Se ha creado el carrito con id ${response.id}`) :  
            console.log(`No se pudo crear el carrito`);
        return response;
    } catch (error) {
        throw new Error(error);
    }
};

export const getAllCarts = async () => {
    try {
        let response = await cartDao.getAllCarts();
        typeof response === "object" ? 
            console.log("Se devuelven todos los carritos de compra") :  
            console.log(`No existe ningun carrito creado`);
        return response;
    } catch (error) {
        throw new Error(error);
    }
};

export const getCartById = async (id) => {
    try {
        let response = await cartDao.getCartById(id);
        response ? 
            console.log(`Se devuelve el carrito con id ${id}`) :  
            console.log(`No existe ningun carrito creado con ese id`);
        return response;
    } catch (error) {
        throw new Error(error);
    }
};

export const saveProductToCart = async (idCart, idProduct) => {
    try {
        let response = await cartDao.saveProductToCart(idCart, idProduct);
        if(response === "p") throw new Error('Product not exist');
        else if(response === "c")throw new Error('Cart not exist');
        else if(typeof response === "object")  console.log(`Se devuelve el carrito con el producto agregado ${JSON.stringify(response)}`);
        else console.log(`Algo ha sucesido con la adicion del producto`);
        return response;
    } catch (error) {
        throw new Error(error);
    }
};
