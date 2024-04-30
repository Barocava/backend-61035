import express from "express";
import { ProductManager } from "./ProductManager.js";

const main = async () => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  const PORT = 8080;

  const productManager = new ProductManager("./products.json");
  const products = await productManager.getProducts();

  app.get("/products", (req, res) => {
    let { limit } = req.query;
    if (!limit) return res.send(products);
    limit = parseInt(limit);
    if (isNaN(limit)) return res.status(404).json({ msg: "Limite no puede ser string" });
    if (limit === 0 || limit < 0) return res.status(404).json({ msg: "Limite invalido" });
    if (limit >= products.length) limit = products.length;
    res.send(products.slice(0, limit));
  });

  app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const prod = await productManager.getProductById(parseInt(id));
    if (!prod) res.status(404).json({ msg: "Product not found" });
    else res.json(prod);
  });

  app.listen(PORT, () => console.log(`Server ok en puerto ${PORT}`));
};

main();