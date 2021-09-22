import mongoose from "mongoose";
import { ProductI } from "../products.interface";

export const productCollection = "products";

export const productSchema = new mongoose.Schema<ProductI>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  createat: { type: Date }
});

