import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../../../firebase.json';
import { newProductI, ProductI, ProductQuery } from '../products.interface';

export class ProductsFirebaseDAO {

    private productos: any;

    constructor() {
            
        admin.initializeApp({
            credential: admin.credential.cert(<ServiceAccount>serviceAccount),
        });

        const db = admin.firestore(); 
        
        this.productos = db.collection('productos')
        console.log('Connected to Firebase!')
    }     

    async get(id?: string): Promise<ProductI[]> {
        let output: ProductI[] = [];
        if (id) {
          const document = await this.productos.doc(id).get();
          const product = document.data();

          if (product) output.push(product);
        } else {
          let resultado = await this.productos.get()
          let docs = resultado.docs

          output = docs.map((aDoc: { id: any; data: () => any; }) => ({
              id: aDoc.id,
              data: aDoc.data()
          }));
        }
    
        return output;
      }
    
      async add(data: newProductI): Promise<ProductI> {
        if (!data.title || !data.price) throw new Error('invalid data');
    
        const newProduct = this.productos.doc();
        await newProduct.create(data);
    
        return newProduct;
      }
      
      async update(id: string, newProductData: newProductI): Promise<ProductI> {
        await this.productos.doc(id).update(newProductData);

        return this.productos.get(id);
      }

      async delete(id: string): Promise<void> {
        await this.productos.doc(id).delete();
      }

    
      async query(options: ProductQuery): Promise<ProductI[]> {
        let query: ProductQuery = {};
    
        if (options.nombre) query.nombre = options.nombre;
    
        if (options.precio) query.precio = options.precio;
    
        return this.productos.find(query);
      }   
}
