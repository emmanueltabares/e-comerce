import { Request, Response, NextFunction } from 'express';
import { productsPersistance } from '../persistance/products';

export const checkProductExists = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const producto = productsPersistance.find(id);

     if (!producto) {
      return res.status(404).json({
        msg: 'producto not found',
      });
    } 
    next();
   }