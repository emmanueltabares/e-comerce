import { CartI, ProductCart, CartBaseClass, CartIPopulate } from "../../../interfaces/carts";
import { CartModel } from "../../schemas/cart";

export class CartsAtlasDAO implements CartBaseClass {
  
  async get(userId: string): Promise<CartI> {
    const result = await CartModel.findOne({ userId } );
    if (!result) throw new Error("id not found");
    return result;
  }

  async getPopulate(userId: string): Promise<CartIPopulate> {
    const cart: any = await CartModel
      .findOne({ userId })
      .populate('products.productId');

    if (!cart) {
      const error: Error = new Error('cart not found');
      throw error;
    }
    return cart;
  }

  async createCart(userId: string): Promise<CartI> {
    const newCart = new CartModel({
      userId,
      products: [],
    });

    await newCart.save();
    return newCart;
  }

  productExist(cart: CartI, productId: string): boolean {
    const index = cart.products.findIndex(
      (aProduct) => aProduct._id == productId
    );

    if (index < 0) return false;
    return true;
  }

  async addProduct(cartId: string, product: ProductCart): Promise<CartI> {
    const cart = await CartModel.findById(cartId);
    if (!cart) throw new Error("Cart not found");

    const index = cart.products.findIndex(
      (aProduct) => aProduct._id == product._id
    );

    if (index < 0) cart.products.push(product);
    else cart.products[index].amount += product.amount;

    await cart.save();
    return cart;
  }

  async deleteProducts(cartId: string, product: ProductCart): Promise<CartI> {
    const cart = await CartModel.findById(cartId);
    if (!cart) throw new Error("Cart not found");

    const index = cart.products.findIndex(
      (aProduct) => aProduct._id == product._id
    );

    if (index < 0) throw new Error("Product not found");

    if (cart.products[index].amount <= product.amount)
      cart.products.splice(index, 1);
    else cart.products[index].amount -= product.amount;

    await cart.save();
    return cart;
  }

  async clearCart(cartId: string) {
    const cart = await CartModel.findById(cartId);
    if (!cart) {
      const error: Error = new Error('Cart not found');
      throw error;
    }
    cart.products = [];
    await cart.save()
  }
}
