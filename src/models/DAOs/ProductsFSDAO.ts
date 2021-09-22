import fs from 'fs';
import { ProductBaseClass, ProductI, newProductI, ProductQuery } from '../products.interface';

export class ProductosFSDAO implements ProductBaseClass {
    private productos: ProductI[] = [];
    private nombreArchivo: string;

    constructor(fileName: string) {
        const mockData = [
            { _id: '1', title: 'lapiz', description: 'lapiz', price: 100, stock: 5, thumbnail: 'hola', createat: new Date() },
            { _id: '2', title: 'lapicera', description: 'lapicera', price: 200, stock: 10, thumbnail: 'prueba', createat: new Date() },
            { _id: '3', title: 'mochila', description: 'mochila', price: 500, stock: 15, thumbnail: 'chau', createat: new Date() },
          ];

          this.nombreArchivo = fileName;
          this.productos = mockData;
          this.guardar();
    }

    async leer(archivo: string): Promise<void> {
        this.productos = JSON.parse(await fs.promises.readFile(archivo, 'utf-8'));
      }
    
      async guardar(): Promise<void> {
        await fs.promises.writeFile(
          this.nombreArchivo,
          JSON.stringify(this.productos, null, '\t')
        );
        
      }

      async findIndex(id: string): Promise<number> {
        await this.leer(this.nombreArchivo);
        return this.productos.findIndex((aProduct: ProductI) => aProduct._id == id);
      }
    
      async find(id: string): Promise<ProductI | undefined> {
        await this.leer(this.nombreArchivo);
    
        return this.productos.find((aProduct) => aProduct._id === id);
      }
    
      async get(id?: string): Promise<ProductI[]> {
        await this.leer(this.nombreArchivo);
    
        if (id) {
          return this.productos.filter((aProduct) => aProduct._id === id);
        }
        return this.productos;
      }
    
      async add(data: newProductI): Promise<ProductI> {
        if (!data.title || !data.price) throw new Error('invalid data');
    
        await this.leer(this.nombreArchivo);
    
        const newItem: ProductI = {
          _id: (this.productos.length + 1).toString(),
          title: data.title,
          description: data.description,
          stock: data.stock,
          price: data.price,
          thumbnail: data.thumbnail,
          createat: data.createat
        };
    
        this.productos.push(newItem);
    
        await this.guardar();
    
        return newItem;
      }
    
      async update(id: string, newProductData: newProductI): Promise<ProductI> {
        await this.leer(this.nombreArchivo);
    
        const index = await this.findIndex(id);
        const oldProduct = this.productos[index];
    
        const updatedProduct: ProductI = { ...oldProduct, ...newProductData };
        this.productos.splice(index, 1, updatedProduct);
    
        await this.guardar();
    
        return updatedProduct;
      }
    
      async delete(id: string): Promise<void> {
        await this.leer(this.nombreArchivo);
    
        const index = await this.findIndex(id);
        this.productos.splice(index, 1);
        await this.guardar();
      }
    
      async query(options: ProductQuery): Promise<ProductI[]> {
        await this.leer(this.nombreArchivo);
        type Conditions = (aProduct: ProductI) => boolean;
        const query: Conditions[] = [];
    
        if (options.nombre)
          query.push((aProduct: ProductI) => aProduct.title == options.nombre);
    
        if (options.precio)
          query.push((aProduct: ProductI) => aProduct.price == options.precio);
    
        return this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
      }
}