import fs from "fs";

class ProductDaoFS {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  //{ title, description, price, thumbnail = "", code, stock = 0, status = true, category}
  async addProduct(obj) {
    try {
      let { title, description, price, thumbnail, code, stock, status, category } = obj;
      code = code.trim().toLowerCase();
      if (await this.getProductByCode(code)) return null
      
      const product = {
        id: (await this.#getMaxId()) + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category
        
      };
      const products = await this.getProducts();
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return "ok"
      
    } catch (error) {
      console.log(error);
    }
  };
  
  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const producto = await this.getProductById(id);
      if (!producto) return null;
      products.splice(producto.indice, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return "ok";
    } catch(error){
      console.log(error);
    }
  };
  
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(products);
      } else {
          await fs.promises.writeFile(this.path, JSON.stringify([]));
          return null;
      }
    } catch (error) {
        console.log(error);
    }
  };
  
  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const item = products.find((product) => product.id === parseInt(id));
      const indice = products.indexOf(item);
      return item ? { item, indice } : null;
    } catch (error) {
        console.log(error);
    }
  };

  async getProductByCode(code) {
    try {
      const products = await this.getProducts();
      return products.find((product) => {
        return Object.values(product).includes(code)
      });
    } catch (error) {
      console.log(error);
    }
  }

  async #getMaxId() {
    let maxId = 0;
    const products = await this.getProducts();
    products.map((product) => {
      if (product.id > maxId) maxId = product.id;
    });
    return maxId;
  };

  async updateProduct(objeto, id) {
    try {
      const products = await this.getProducts();
      const producto = await this.getProductById(id);
      if (!producto) return null;
      products[producto.indice] = { ...producto.item, ...objeto };
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return `ok`;
    } catch (error) {
      console.log(error);
    }
  };

}

export default ProductDaoFS;