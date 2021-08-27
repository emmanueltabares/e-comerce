import fs from 'fs/promises';
import path from 'path';

let productos: any = [];
const pathBdd = path.resolve(__dirname, '../../public/bdd.json')

  interface newProduct {
    nombre: string;
    descripcion: string,
    codigo: number,
    foto: string,
    precio: number,
    stock: number;
  }
  
  interface Product {
    id: number;
    nombre: string;
    descripcion: string,
    codigo: number,
    foto: string,
    precio: number,
    stock: number;
  }
  
  class Productos {
    find(id: number): Product | undefined {
      return productos.find((aProduct: any) => aProduct.id === Number(id));
    }
  
    /* get(id?: number) {
    
      if (id) {
        return productos.filter((aProduct) => aProduct.id === id);
      }
      return productos; 
    } */

    async get(id?: number) {
        
      const dataFile: any  = await fs.readFile(pathBdd)
      const dataProducts = JSON.parse(dataFile)
      console.log(dataProducts)

      productos.push(dataProducts)
      console.log(productos)
      return productos;
    }
  
   async add(data: newProduct) {
    try {  
        const newItem: Product = {
        id: productos.length + 1,
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigo: data.codigo,
        foto: data.foto,
        precio: data.precio,
        stock: data.stock
      };

        productos.push(newItem);
        await fs.writeFile(productos, pathBdd)
        console.log(productos)
        return newItem;
      } catch (error) {
        return error;
      }
      
    }
  
    // update(id, data){
  
    // }
  
    delete(id: number) {
      productos = productos.filter((aProduct: any) => aProduct.id !== id);
      return productos;
    }
  }
  
  export const productsPersistencia = new Productos();