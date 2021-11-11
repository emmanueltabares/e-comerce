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
  
    getProducts(req: Request, res: Response) {
      const id = req.params.id;
  
      const product = id
        ? productsPersistance.get(id)
        : productsPersistance.get();
  
      res.json({
        data: product,
      });
    }
  
    addProducts(req: Request, res: Response) {
      const newItem = productsPersistance.add(req.body);
  
      res.json({
        msg: 'producto agregado con exito',
        data: newItem,
      });
    }
  
    updateProducts(req: Request, res: Response) {
      res.json({
        msg: 'actualizando producto',
      });
    }
  
    deleteProducts(req: Request, res: Response) {
      const id = req.params.id;
  
      productsPersistance.delete(id);
      res.json({
        msg: 'producto borrado',
      });
    }
  }
  
  export const productsController = new Products();