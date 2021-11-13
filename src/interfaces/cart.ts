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