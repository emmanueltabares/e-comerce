import { Schema } from 'mongoose';

export type productReference = Schema.Types.ObjectId | string;

export interface CartI {
  _id: string;
  userId: productReference;
  products: ProductCart[];
}

export interface ProductCart {
  _id: string;
  amount: number;
}

export interface ProductI {
  _id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  codigo: string;
  foto: string;
  stock: number;
}

export interface CartIPopulate {
  _id: string;
  userId: productReference;
  products: ProductCartPopulate[];
}

export interface ProductCartPopulate {
  productId: ProductI;
  quantity: number;
}

export interface CartBaseClass {
  get(id: string): Promise<CartI>;
  createCart(userId: string): Promise<CartI>;
  addProduct(cartId: string, product: ProductCart): Promise<CartI>;
  deleteProducts(cartId: string, product: ProductCart): Promise<CartI>;
}