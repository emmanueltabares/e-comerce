import { CartFactoryDAO } from '../models/carts/carts.factory';
import { TipoPersistencia } from '../models/carts/carts.factory';
import { CartI, CartIPopulate } from '../interfaces/carts';
import { UserAPI } from '../apis/users';
import { productsAPI } from '../apis/products';
/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = TipoPersistencia.MongoAtlas;

class Cart {
  private carts;

  constructor() {
    this.carts = CartFactoryDAO.get(tipo);
  }

  async getCart(userId: string): Promise<CartI> {
    return this.carts.get(userId);
  }

  async getCartPopulate(userId: string): Promise<CartIPopulate> {
    return this.carts.getPopulate(userId);
  }

  async createCart(userId: string): Promise<CartI> {
    const user = await UserAPI.get(userId);

    if (!user.length)
      throw new Error('User does not exist. Error creating cart');

    const newCart = await this.carts.createCart(userId);
    return newCart;
  }

  async addProduct(
    cartId: string,
    productId: string,
    amount: number,
  ): Promise<CartI> {
    const product = (await productsAPI.get(productId))[0];

    const addProduct = {
      _id: productId,
      nombre: product.nombre,
      precio: product.precio,
      amount,
    };

    const updatedCart = await this.carts.addProduct(cartId, addProduct);
    return updatedCart;
  }

  async deleteProducts(cartId: string, productId: string, amount: number) {
    const product = (await productsAPI.get(productId))[0];

    const deleteProduct = {
      _id: productId,
      nombre: product.nombre,
      precio: product.precio,
      amount,
    };

    const updatedCart = await this.carts.deleteProducts(cartId, deleteProduct);
    return updatedCart;
  };

  async clearCart(cartId: string) {
    return await this.carts.clearCart(cartId);
  }
}



export const CartAPI = new Cart();