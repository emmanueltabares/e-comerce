import path from 'path';

const pathBdd = path.resolve(__dirname, '../../public/bdd.json')
let cart: any = [];

  interface productCart {
    id: number,
    nombre: string;
    descripcion: string,
    codigo: number,
    foto: string,
    precio: number,
    stock: number;
  }
  
  interface newCart {
    id: number;
    producto: [productCart]
  }
  
  class Cart {
    find(id: number) {
      return cart.find((aCart: newCart) => aCart.id === Number(id));
    }
  
    get(id?: number) {
    
      if (id) {
        return cart.filter((aCart: newCart) => aCart.id === id);
      }
      return cart; 
    }
  
    add(data: newCart) {

      const newCart = {
        id: data.id,
        producto: data.producto
      };
  
      cart.push(newCart);
  
      return newCart;
    }
  
    // update(id, data){
  
    // }
  
    delete(id: number) {
      cart = cart.filter((aCart: newCart) => aCart.id !== id);
      return cart;
    }
  }
  
  export const carritoPersistencia = new Cart();