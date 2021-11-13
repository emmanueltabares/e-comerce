import { productsPersistance } from '../persistance/products';
import { Request, Response, NextFunction } from 'express';

class Products {
/* 
    checkAddProducts(req: Request, res: Response, next: NextFunction) {
      const { name, description, cod, photo, price, stock } = req.body;
  
      if (!name || !price || !description || !cod || !photo || !stock || typeof name !== 'string' || isNaN(price)) {
        return res.status(400).json({
          msg: 'Campos del body invalidos',
        });
      }
  
      next();
    }
  
    checkProductExists(req: Request, res: Response, next: NextFunction) {
      const id = Number(req.params.id);
      const producto = productsPersistance.find(id);
  
      /* if (!producto) {
        return res.status(404).json({
          msg: 'producto not found',
        });
      } 
      next();
     }*/
  
    async getProducts(req: Request, res: Response) {
      const { id } = req.params;
  
      const product = id
        ? await productsPersistance.get(id)
        : await productsPersistance.get();
  
      res.json({
        data: product,
      });
    }
  
    async addProducts(req: Request, res: Response) {
      const newItem = await productsPersistance.add(req.body);
  
      res.json({
        msg: 'producto agregado con exito',
        data: newItem,
      });
    }
  
    async updateProducts(req: Request, res: Response) {
      const { id } = req.params;
      const { body } = req.body;

      const newProduct = await productsPersistance.update(id, body)

      res.json({
        msg: 'actualizando producto',
        data: newProduct
      });
    }
  
    async deleteProducts(req: Request, res: Response) {
      const { id } = req.params;
  
      const product = await productsPersistance.delete(id);
      res.json({
        msg: 'producto borrado',
        data: product
      });
    }
  }
  
  export const productsController = new Products();