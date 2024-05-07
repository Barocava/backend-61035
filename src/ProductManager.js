import fs from "fs";

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async getProductByCode(code) {
    const products = await this.getProducts();
    return products.some((product) => {
      return Object.values(product).includes(code);
    });
  }

  async addProduct({ title, description, price, thumbnail = "", code, stock = 0, status = true, category}) {
    code = code.trim().toLowerCase();
    if (await this.getProductByCode(code)) {
      console.log(`Codigo de producto repetido ${code}. No se agrega al listado`);
      return null
    }

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
    return "Se ha creado el producto satisfactoreamente"
  }

  async #getMaxId() {
    let maxId = 0;
    const products = await this.getProducts();
    products.map((product) => {
      if (product.id > maxId) maxId = product.id;
    });
    return maxId;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(products);
      } else {
        await fs.promises.writeFile(this.path, JSON.stringify([]));
        return "Se crea archivo vacio";
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const item = products.find((product) => product.id === parseInt(id));
    const indice = products.indexOf(item);
    return item ? { item, indice } : console.log("Not found");
  }

  async updateProduct(objeto, id) {
    const products = await this.getProducts();
    const producto = await this.getProductById(id);
    if (!producto){
      console.log("No se ha actualizado el producto. ID no encontrado");
      return null
    }
    products[producto.indice] = { ...producto.item, ...objeto };
    await fs.promises.writeFile(this.path, JSON.stringify(products));
    return `Se ha actualizado el producto ${id}`;
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const producto = await this.getProductById(id);
    if (!producto) {
      console.log("No se ha eliminado el producto. ID no encontrado");
      return null;
    }
    products.splice(producto.indice, 1);
    await fs.promises.writeFile(this.path, JSON.stringify(products));
    console.log(`Se ha eliminado el producto ${id}`);
  }
}

export default ProductManager;