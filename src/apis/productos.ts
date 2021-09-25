import { newProductI, ProductI } from '../models/products.interface';
import { FactoryDAO } from '../models/products.factory';
import { TipoPersistencia } from '../models/products.factory';
import faker from 'faker';

const tipo = TipoPersistencia.memoria;

class ProductApi {
  
    private products: any;
    private mockProducts: any;

    constructor() {
        this.products = FactoryDAO.get(tipo)
        this.mockProducts = [{id: 1, title: 'prueba', price: '2000', description: 'pruebaMock'}];
    }

    getProductMock(cant: number = 10): Promise<ProductI[]> {
        
      const mockProduct: ProductI = {
        _id: faker.datatype.uuid(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.datatype.number(100),
        price: Number(faker.commerce.price()),
        thumbnail: faker.image.imageUrl(),
        createat: faker.date.past(),
      }
       
      this.mockProducts.push(mockProduct)

      return this.mockProducts;
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