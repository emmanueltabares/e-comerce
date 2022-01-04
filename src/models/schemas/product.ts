import { Schema } from 'mongoose';
import { MongoDB } from '../../services/mongodb';
import { ProductI } from '../../interfaces/products';

const productSchema = new Schema<ProductI>({
    name: { type: String, required: true},
    cod: { type: Number, required: true},
    description: { type: String, required: true},
    photos: { type: Array, required: false, default: []},
    price: { type: Number, required: true},
    stock: { type: Number, required: true},   
});

const MongoAtlas = new MongoDB();
const AtlasMongoose = MongoAtlas.getConnection();
export const ProductModel = AtlasMongoose.model<ProductI>('products', productSchema);