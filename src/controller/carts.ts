import { NextFunction, Request, Response } from 'express';
import { productsAPI } from '../apis/products';
import { CartAPI } from '../apis/carts'
import { ordersAPI } from '../apis/orders';
import { UserI } from '../interfaces/users';
import { Logger } from '../services/logger';
import { ProductCartPopulate, productReference } from '../interfaces/carts';
import { Items } from '../interfaces/orders';

class Cart {

  async getCartByUser(req: Request, res: Response) {
    
     if (req.user) {
      const user = req.user as any;
      const userId = user._id; 
    const cart = await CartAPI.getCart(userId);
    res.json(cart);
  } 
}

  async addProduct(req: Request, res: Response) {
    if (req.user) {
      const user = req.user as any;
      const userId = user._id; 
      const cart = await CartAPI.getCart(userId);

      const { productId, productAmount } = req.body;

    if (!productId || !productAmount)
      return res.status(400).json({ msg: 'Invalid body parameters' });

    const product = await productsAPI.get(productId);

    if (!product.length)
      return res.status(400).json({ msg: 'product not found' });

      
    if (parseInt(productAmount) < 0)
      return res.status(400).json({ msg: 'Invalid amount' });

    const updatedCart = await CartAPI.addProduct(
      cart._id,
      productId,
      parseInt(productAmount),
    );
    res.json({ msg: 'Product added', cart: updatedCart });
  }
}
  async deleteProducts(req: Request, res: Response) {
    if (req.user) {
      const user = req.user as any;
      const userId = user._id; 
      const cart = await CartAPI.getCart(userId);

    const { productId, productAmount } = req.body;

    if (!productId || !productAmount)
      return res.status(400).json({ msg: 'Invalid body parameters' });

    const product = await productsAPI.get(productId);

    if (!product.length)
      return res.status(400).json({ msg: 'product not found' });

    if (parseInt(productAmount) < 0)
      return res.status(400).json({ msg: 'Invalid amount' });

    const updatedCart = await CartAPI.deleteProducts(
      cart._id,
      productId,
      parseInt(productAmount)
    );
    res.json({ msg: 'Product deleted', cart: updatedCart });
    }
  }

  async postCarrito(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user) {
        const user = req.user as UserI;
        const { _id } = user;

        const cart = await CartAPI.getCartPopulate(_id);

        const { products } = cart;
        if (products.length === 0) {
          res.status(400).json({ msg: "No hay productos en el carrito"});
        };

        let items: any = [];

        products.forEach((prod: any) => {
          const produc: any = {
            amount: prod.amount,
            productId: prod._id,
          };
          items.push(produc);
        });

        const orderData: any = {
          userId: _id,
          items,

        }; 
        await ordersAPI.createOrden(orderData);
        await CartAPI.clearCart(cart._id);

        res.json({ msg: 'Su compra se realizo correctamente', data: orderData });
      }
     } catch (err: any) {
      Logger.error(err);
      next(err);
    }
  }
}

export const CartController = new Cart();