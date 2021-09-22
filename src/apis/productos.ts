import { newProductI, ProductI } from '../models/products.interface';
import { FactoryDAO } from '../models/products.factory';
import { TipoPersistencia } from '../models/products.factory';

const tipo = TipoPersistencia.Firebase;

class ProductApi {
    
    private products: any

    constructor() {
        this.products = FactoryDAO.get(tipo)
    }

    async getProduct(id: string | undefined = undefined): Promise<ProductI[]> {
        if(id) return this.products.get(id) 

        return this.products.get();
    }

    async addProduct(data: newProductI): Promise<ProductI> {
        const newProduct = await this.products.add(data);

        return newProduct;
    }

    async updateProduct(id: string, data: newProductI) {
        const updatedProduct = await this.products.update(id, data);
        return updatedProduct;
      }
    
    async deleteProduct(id: string) {
        await this.products.delete(id);
      } 
}

export const productsAPI = new ProductApi();