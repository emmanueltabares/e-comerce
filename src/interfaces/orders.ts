import { Schema } from 'mongoose';

export type ObjectId = Schema.Types.ObjectId | string;

export interface Items {
  quantity: number;
  productId: ObjectId;
  precio: number;
}

export interface NewOrderI {
  items: Items[];
  userId: ObjectId;
}

export interface OrderI {
  items: Items[];
  userId: ObjectId;
  timestamp: string;
  estado: string;
  total: number;
  _id?: ObjectId;
}

export interface OrderBaseClass {
  createOrder(dataOrder: NewOrderI): Promise<OrderI>;
  getOrder(userId: string, idOrder: string): Promise<OrderI>;
  getOrders(userId: string): Promise<OrderI[]>;
  postOrders(userId: string, idOrder: string): Promise<OrderI>;
}
