import { CartAPI } from '../apis/carts';
import { Request, Response, NextFunction } from 'express';
import { UserI } from '../interfaces/users';
import { productsAPI } from '../apis/products';

class Cart {
  async getCartByUser(req: Request, res: Response) {
    const { id } = req.params;
    const cart = await CartAPI.getCart(id);
    res.json(cart);
  }

  async addProduct(req: Request, res: Response) {
    const { user }: any = req.body;
    const cart = await CartAPI.getCart(user._id);

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
      parseInt(productAmount)
    );
    res.json({ msg: 'Product added', cart: updatedCart });
  }

  async deleteProduct(req: Request, res: Response) {
    const { user }: any = req.body;
    const cart = await CartAPI.getCart(user._id);

    const { productId, productAmount } = req.body;

    if (!productId || !productAmount)
      return res.status(400).json({ msg: 'Invalid body parameters' });

    const product = await productsAPI.get(productId);

    if (!product.length)
      return res.status(400).json({ msg: 'product not found' });

    if (parseInt(productAmount) < 0)
      return res.status(400).json({ msg: 'Invalid amount' });

    const updatedCart = await CartAPI.deleteProduct(
      cart._id,
      productId,
      parseInt(productAmount)
    );
    res.json({ msg: 'Product deleted', cart: updatedCart });
  }

  async deleteCart (req: Request, res: Response) {
    const { id } = req.body;
    const cart = await CartAPI.getCart(
      id);
  }

  async addCart(req: Request, res: Response)  {
    throw new Error("Method not implemented");
  }
}

export const CartController = new Cart();