import mongoose, { Schema } from 'mongoose';
import { CartI } from '../../interfaces/cart';

const cartSchema = new Schema<CartI>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  products: [
    {
      _id: Schema.Types.ObjectId,
      amount: Number,
    },
  ],
});

export const CartModel = mongoose.model<CartI>('cart', cartSchema);