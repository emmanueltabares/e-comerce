import { Request, Response, NextFunction } from 'express';
import { productsAPI } from '../apis/productos';

class Producto {
    
  //Chequea si la info es apta para agregar el producto
   checkAddProducts(req: Request, res: Response, next: NextFunction) {
    const { title, description, price, stock, thumbnail, createat } = req.body;

    if (!title || !description || !price || !stock || !thumbnail || !createat || typeof title !== 'string' || isNaN(price)) {
      return res.status(400).json({
        msg: 'Campos del body invalidos',
      });
    }

    next();
  }

  //Chequea la existencia del producto
  checkProductExists(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const producto = productsAPI.getProduct(id);

    if (!producto) {
      return res.status(404).json({
        msg: 'producto not found',
      });
    }
    next();
  }

  async getProducts(req: Request, res: Response) {
    const { id } = req.params;

    const item = await productsAPI.getProduct(id)
  
    res.json({
      data: item,
    });
  }

  async addProducts(req: Request, res: Response) {

    const data = req.body;

    if(!data)
      return res.status(404).json({
        msg: "Campos invalidos",
      });

    const id = await productsAPI.addProduct(data);

    res.json({
      msg: 'producto agregado con exito',
      data: data
    });
  }

  async updateProducts(req: Request, res: Response) {
    
    const { id } = req.params;
    const body = req.body;

    if(!body)
      return res.status(404).json({
        msg: "Campos invalidos",
      });

    let item = await productsAPI.getProduct(id)

    await productsAPI.updateProduct(id, body);

    item = await productsAPI.getProduct(id)
    res.json({
      msg: 'Producto actualizado',
      item,
    });
  }

  async deleteProducts(req: Request, res: Response) {

    const { id } = req.params;

    let item = await productsAPI.getProduct(id)

    await productsAPI.deleteProduct(id)
    res.json({
      msg: 'product deleted',
      data: item,
    });
  }

   async postProductsTest(req: Request, res: Response) {
    
    const cant  = req.params.cant ? req.params.cant : 10;

    let productsTest;  
      
    for(let i = 0; i < cant; i++) {
        productsTest = await productsAPI.postProductMock();
    }
    
    res.json({
        msg: 'Mock generado',
        data: productsTest,
    }); 
  }
}

export const productController = new Producto();