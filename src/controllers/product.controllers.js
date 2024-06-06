import * as service from "../services/product.services.js";

export const addProduct = async (req, res, next) => {
    try {
        const prod = await service.addProduct(req.body);
        if (!prod) res.status(404).json({msg: 'El codigo del producto ya existe'});
        else res.status(201).json(prod);
      } catch (error) {
        next(error.message);
      }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const delID = await service.deleteProduct(id);
        if(!delID) res.status(404).json({ msg: "Error delete id" });
        else res.status(200).json({msg : `Id: ${id} deleted successfully`})
      } catch (error) {
        next(error.message);
      }
};

export const getProducts = async (req, res, next) => {
    try {
        const products = await service.getProducts();
        let { limit } = req.query;
        if (!limit) return res.send(products);
        limit = parseInt(limit);
        if (isNaN(limit)) return res.status(404).json({ msg: "Limite no puede ser string" });
        if (limit === 0 || limit < 0) res.status(404).json({ msg: "Limite invalido" });
        if (limit >= products.length) limit = products.length;
         res.send(products.slice(0, limit));
    } catch (error) {
        next(error.message);
  }
};

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prod = await service.getProductById(parseInt(id));
        if (!prod) res.status(404).json({ msg: "Product not found" });
        else res.json(prod);
    } catch (error) {
        next(error.message);
      }
};

export const getProductByCode = async (req, res, next) => {
    try {
        const { code } = req.params;
        const prod = await service.getProductByCode(code);
        if (!prod) res.status(404).json({ msg: "Product not found" });
        else res.json(prod);
    } catch (error) {
        next(error.message);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userUpd = await service.updateProduct(req.body, id);
        if (!userUpd) res.status(404).json({ msg: "Error updating product" });
        else res.status(200).json(userUpd);
      } catch (error) {
        next(error.message);
      }
};