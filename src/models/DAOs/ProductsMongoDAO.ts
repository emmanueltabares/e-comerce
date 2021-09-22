import mongoose from 'mongoose';
import { newProductI, ProductI, ProductBaseClass, ProductQuery } from '../products.interface'; 
import { productCollection, productSchema } from '../modelsBases/productsCollection';

export class ProductAtlasDAO implements ProductBaseClass {

     private productos: any;
     private MONGODB_URI: string;

    constructor(local: boolean = false) {

        if(local) {
            this.MONGODB_URI = 'mongodb://localhost:27017/ecommerce';
        } else {
         
            this.MONGODB_URI = `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASS}@${process.env.MONGO_ATLAS_CLUSTER}/${process.env.MONGO_ATLAS_DB}?retryWrites=true&w=majority`;
        } 
            mongoose.connect(this.MONGODB_URI);
        
            const db = mongoose.connection;
        
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', () => {
              console.log('connected to MongoDB!'); // si esta todo ok, imprime esto
            });

            this.productos = mongoose.model<ProductI>(productCollection, productSchema);
        }    

    async get(id?: string): Promise<ProductI[]> {
        let output: ProductI[] = [];
        if (id) {
          const document = await this.productos.findById(id);
          if (document) output.push(document);
        } else {
          output = await this.productos.find();
        }
    
        return output;
      }
    
      async add(data: newProductI): Promise<ProductI> {
        if (!data.title || !data.price) throw new Error('invalid data');
    
        const newProduct = this.productos(data);
        await newProduct.save();
    
        return newProduct;
      }
    
      async update(id: string, newProductData: newProductI): Promise<ProductI> {
        return this.productos.findByIdAndUpdate(id, newProductData);
      }
    
      async delete(id: string) {
        await this.productos.findByIdAndDelete(id);
      }
    
      async query(options: ProductQuery): Promise<ProductI[]> {
        let query: ProductQuery = {};
    
        if (options.nombre) query.nombre = options.nombre;
    
        if (options.precio) query.precio = options.precio;
    
        return this.productos.find(query);
      }
}