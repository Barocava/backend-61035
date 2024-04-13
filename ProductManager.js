class ProductManager {
    
    constructor(){
        this.products = [];
    };

    getProductByCode(code){
        return this.products.some((product) => {
            return Object.values(product).includes(code)
        } )
      };

    addProduct({title, description, price, thumbnail, code, stock = 0}){

        code = code.trim().toLowerCase();
        if(this.getProductByCode(code)) return console.log(`Codigo de producto repetido ${code}. No se agrega al listado`);
        
        const product = {
            id: this.#getMaxId() + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(product);
    };

    #getMaxId() {
        let maxId = 0;
        this.products.map((product) => { 
        if (product.id > maxId) maxId = product.id;
        });
        return maxId;
    };

    getProducts() {
        return this.products;
    };

    getProductById(id){
        const item = this.products.find((product) => product.id === id);
        return item ? item : "Not found"
    };
}

const productManager = new ProductManager();

productManager.addProduct({
    title: "producto prueba",
    description:"Este es un producto prueba",
    price:200,
    thumbnail:"Sin imagen",
    code:"abc123",
    stock:25
    });

productManager.addProduct({
    title: "producto prueba",
    description:"Este es un producto prueba",
    price:200,
    thumbnail:"Sin imagen",
    code:"abc123",
    stock:25
    });

productManager.addProduct({
    title: "Teléfono móvil",
    description: "Smartphone con cámara de alta resolución",
    price: 499.99,
    thumbnail: "ruta/de/imagen4.jpg",
    code: "XYZ456",
    stock: 15,
    });

productManager.addProduct({
    title: "Laptop",
    description: "Portátil con procesador de última generación",
    price: 899.99,
    thumbnail: "ruta/de/imagen5.jpg",
    code: "LMN789",
    stock: 10,
    });

productManager.addProduct({
    title: "Bicicleta",
    description: "Bicicleta de montaña resistente",
    price: 349.99,
    thumbnail: "ruta/de/imagen6.jpg",
    code: "BCD234",
    stock: 20,
    });

productManager.addProduct({
    title: "Bicicleta",
    description: "Bicicleta de montaña resistente",
    price: 349.99,
    thumbnail: "ruta/de/imagen6.jpg",
    code: "BCD234",
    stock: 20,
    });
      

console.log("+++++++++++++++++++++++++++++")
console.log(productManager.getProducts());
console.log("+++++++++++++++++++++++++++++")
console.log(productManager.getProductById(1));
console.log("+++++++++++++++++++++++++++++")
console.log(productManager.getProductById(8));