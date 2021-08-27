import { Request, Response, NextFunction } from 'express';
import { carritoPersistencia } from '../persistencia/carrito';

class Cart {

  getCart(req: Request, res: Response) {
    const id = Number(req.params.id);

    const cart = id
      ? carritoPersistencia.get(id)
      : carritoPersistencia.get();

    res.json({
      cart: cart,
    });
  }

  addProducts(req: Request, res: Response) {
    const newProduct = carritoPersistencia.add(req.body);

    res.json({
      msg: 'producto agregado con exito',
      cart: newProduct,
    });
  }

  deleteCart(req: Request, res: Response) {
    const id = Number(req.params.id);

    carritoPersistencia.delete(id);
    res.json({
      msg: 'Carrito borrado',
    });
  }
}

export const carritoController = new Cart();