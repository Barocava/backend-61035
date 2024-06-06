import {__dirname} from '../utils.js';
import ProductDaoFS from '../daos/filesystem/product.dao.js';
//const prodDao = new ProductDaoFS(`${__dirname}/daos/filesystem/products.json`);
const prodDao = new ProductDaoFS(`${__dirname}/data/products.json`);

export const addProduct = async (obj) => {
    try {
        let response = await prodDao.addProduct(obj);
        response ? 
            console.log("Se ha creado el producto satisfactoreamente") :  
            console.log(`Codigo de producto repetido. No se agrega al listado`);
        return response;
      } catch (error) {
        throw new Error(error);
      }
};

export const deleteProduct = async (id) => {
    try {
        let response = await prodDao.deleteProduct(id);
        response ? 
            console.log(`Se ha eliminado el producto ${id}`) :
            console.log("No se ha eliminado el producto. ID no encontrado");
        return response;
    } catch (error) {
        throw new Error(error);
    }
};

export const getProducts = async () => {
    try {
        let response = await prodDao.getProducts();
        response ? 
        console.log("Se devuelven todos los productos") :  
        console.log(`Se crea archivo vacio`);
        return response;  
    } catch (error) {
        throw new Error(error);
    }
};

export const getProductById = async (id) => {
    try {
        let response = await prodDao.getProductById(id);
        if(response){
            let { item, indice } = response;
            console.log("Se devuelve producto: " + item.title);
            return { item, indice }
        }
        else {
            console.log("Not found");
            return null
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const getProductByCode = async (code) => {
    try {
        let response = await prodDao.getProductByCode(code);
        response ? 
        console.log(`Se devuelve el producto con codigo ${code}`) :  
        console.log(`No existe un producto con codigo ${code}`);
        return response;       
        
    } catch (error) {
        throw new Error(error);
    }
};

export const updateProduct = async (objeto, id) => {
    try {
        let response = await prodDao.updateProduct(objeto, id);
        response ? 
        console.log(`Se ha actualizado el producto ${id}`) :  
        console.log("No se ha actualizado el producto. ID no encontrado");
        return response;  
        
    } catch (error) {
        throw new Error(error); 
    }
};