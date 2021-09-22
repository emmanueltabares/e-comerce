import {
    newProductI,
    ProductI,
    ProductBaseClass,
    ProductQuery,
  } from '../products.interface';
  
  export class ProductosMemDAO implements ProductBaseClass {
    private productos: ProductI[] = [];
  
    constructor() {
        const mockData = [
            { _id: '1', title: 'lapiz', description: 'lapiz', price: 100, stock: 5, thumbnail: 'hola', createat: new Date() },
            { _id: '2', title: 'lapicera', description: 'lapicera', price: 200, stock: 10, thumbnail: 'prueba', createat: new Date() },
            { _id: '3', title: 'mochila', description: 'mochila', price: 500, stock: 15, thumbnail: 'chau', createat: new Date() },
          ];
  
      mockData.forEach((aMock) => this.productos.push(aMock));
    }
  
    findIndex(id: string) {
      return this.productos.findIndex((aProduct) => aProduct._id == id);
    }
  
    find(id: string): ProductI | undefined {
      return this.productos.find((aProduct) => aProduct._id === id);
    }
  
    async get(id?: string): Promise<ProductI[]> {
      if (id) {
        return this.productos.filter((aProduct) => aProduct._id === id);
      }
      return this.productos;
    }
  
    async add(data: newProductI): Promise<ProductI> {
      if (!data.title || !data.price) throw new Error('invalid data');
  
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
  
      return newItem;
    }
  
    async update(id: string, newProductData: newProductI): Promise<ProductI> {
      const index = this.findIndex(id);
      const oldProduct = this.productos[index];
  
      const updatedProduct: ProductI = { ...oldProduct, ...newProductData };
      this.productos.splice(index, 1, updatedProduct);
      return updatedProduct;
    }
  
    async delete(id: string): Promise<void> {
      const index = this.findIndex(id);
      this.productos.splice(index, 1);
    }
  
    async query(options: ProductQuery): Promise<ProductI[]> {
      type Conditions = (aProduct: ProductI) => boolean;
      const query: Conditions[] = [];
  
      if (options.nombre)
        query.push((aProduct: ProductI) => aProduct.title == options.nombre);
  
      if (options.precio)
        query.push((aProduct: ProductI) => aProduct.price == options.precio);
  
      return this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
    }
  }