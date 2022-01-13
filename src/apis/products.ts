import { newProductI, ProductI } from '../interfaces/products';
import { NoticiasFactoryDAO } from '../models/products/products.factory';
import { TipoPersistencia } from '../models/products/products.factory';

const tipo = TipoPersistencia.MongoAtlas;

class prodAPI {
  private productos: any;

  constructor() {
    this.productos = NoticiasFactoryDAO.get(tipo);
  }

  async get(id: string | undefined = undefined): Promise<ProductI[]> {
    if (id) return this.productos.get(id);

    return this.productos.get();
  }

  async add(productData: newProductI): Promise<ProductI> {
    return await this.productos.add(productData);
  }

  async update(id: string, productData: newProductI) {
    await this.productos.update(id, productData);
  }

  async delete(id: string) {
    await this.productos.delete(id) 
  }
}

export const productsAPI = new prodAPI();