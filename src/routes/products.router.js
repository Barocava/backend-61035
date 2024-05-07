import { Router } from "express";
import ProductManager from "../ProductManager.js";
import productsValidator from "../middlewares/products.validator.js";


const router = Router();
const productManager = new ProductManager("./data/products.json");

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        let { limit } = req.query;
        if (!limit) return res.send(products);
        limit = parseInt(limit);
        if (isNaN(limit)) return res.status(404).json({ msg: "Limite no puede ser string" });
        if (limit === 0 || limit < 0) return res.status(404).json({ msg: "Limite invalido" });
        if (limit >= products.length) limit = products.length;
        res.send(products.slice(0, limit));
    } catch (error) {
        res.status(500).json({ msg: error.message });
  }
  });

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const prod = await productManager.getProductById(parseInt(id));
        if (!prod) res.status(404).json({ msg: "Product not found" });
        else res.json(prod);
    } catch (error) {
        res.status(500).json({ msg: error.message });
      }
  });

router.post("/", [productsValidator], async (req, res) => {
    try {
      console.log(req.body);
      const prod = await productManager.addProduct(req.body);
      if (!prod) res.status(404).json({msg: 'El codigo del producto ya existe'});
      else res.status(201).json(prod);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });

router.put("/:idUser", async (req, res) => {
    try {
      const { idUser } = req.params;
      const userUpd = await productManager.updateProduct(req.body, idUser);
      if (!userUpd) res.status(404).json({ msg: "Error updating product" });
      else res.status(200).json(userUpd);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
  
router.delete("/:idUser", async (req, res) => {
    try {
      const { idUser } = req.params;
      const delUser = await productManager.deleteProduct(idUser);
      if(!delUser) res.status(404).json({ msg: "Error delete user" });
      else res.status(200).json({msg : `User id: ${idUser} deleted successfully`})
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
  
export default router;