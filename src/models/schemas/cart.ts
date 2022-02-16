import { Schema } from 'mongoose';
import { CartI } from '../../interfaces/carts';
import { MongoDB } from '../../services/mongodb';

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

const MongoAtlas = new MongoDB();
const AtlasMongoose = MongoAtlas.getConnection();
export const CartModel = AtlasMongoose.model<CartI>('carts', cartSchema);