import fs from "fs";
import {__dirname} from '../../utils.js';
import ProductDaoFS from './product.dao.js';

const prodDao = new ProductDaoFS(`../src/data/products.json`);

class CartManager {
  constructor(path) {
    this.path = path;
  };

  async createCart() {
    try {
      const cart = {
        id: (await this.#getMaxId()) + 1,
        products: []
      };
      const cartsFile = await this.getAllCarts();
      cartsFile.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  };

  async getAllCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, "utf-8");
        const cartsJSON = JSON.parse(carts);
        return cartsJSON;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  async getCartById(id) {
    try {
      const carts = await this.getAllCarts();
      const cart = carts.find((c) => parseInt(c.id) === parseInt(id));
      if (!cart) return null;
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  };

  async #getMaxId() {
    let maxId = 0;
    const products = await this.getAllCarts();
    products.map((product) => {
      if (product.id > maxId) maxId = product.id;
    });
    return maxId;
  };

  async saveProductToCart(idCart, idProduct) {
    try {
      const prodExist = await prodDao.getProductById(parseInt(idProduct)); //verificamos si el prod existe en el json
      if(!prodExist) return "p"; //throw new Error('product not exist');
      const cartExist = await this.getCartById(parseInt(idCart)); //verificamos si el cart existe en el json
      if(!cartExist) return "c"; //throw new Error('cart not exist');
      let cartsFile = await this.getAllCarts();
      const existProdInCart = cartExist.products.find((prod) => parseInt(prod.id) === parseInt(idProduct)); //verificamos si el prod existe en el cart 
      if(!existProdInCart) {
        //si no existe, lo agregamos
        const product = {
          id: idProduct,
          quantity: 1
        };
        cartExist.products.push(product);
      } else existProdInCart.quantity++;
      const updatedCarts = cartsFile.map((cart) => {
        if(parseInt(cart.id) === parseInt(idCart)) return cartExist
        return cart
      });
      await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts));
      return cartExist 
    } catch (error) {
      throw new Error(error)
    }
  };
}

export default CartManager;