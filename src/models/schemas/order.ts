import { Schema } from "mongoose";
import { OrderI } from "../../interfaces/orders";
import { MongoDB } from "../../services/mongodb";

const orderSchema = new Schema<OrderI>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      amount: { type: Number },
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Productos",
      },
      precio: { type: Number },
    },
  ],
  timestamp: { type: String, default: new Date() },
  estado: {
    type: String,
    default: "GENERADO",
  },
  total: {
    type: Number,
  },
});

const MongoAtlas = new MongoDB();
const AtlasMongoose = MongoAtlas.getConnection();
export const OrderModel = AtlasMongoose.model<OrderI>('orders', orderSchema);
