import { Request, Response, NextFunction } from 'express';
import { productsAPI } from '../apis/products';

export const checkProductExists = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const producto = productsAPI.get(id);

     if (!producto) {
      return res.status(404).json({
        msg: 'producto not found',
      });
    } 
    next();
   }