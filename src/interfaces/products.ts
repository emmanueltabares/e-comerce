export interface ProductI {
    nombre: any;
    precio: any;
    _id: string;
    name: string;
    cod: number;
    description: string;
    photos: string;
    price: number;
    stock: number;  
}

export interface newProductI {
    name: string;
    cod: number;
    description: string;
    photo: string;
    price: number;
    stock: number; 
}

export interface BaseProductI {
    get(id?: string): Promise<ProductI[]>;
    add(data: newProductI): Promise<ProductI>;
    update(id: string, newProductData: newProductI): Promise<void>;
    delete(id: string): Promise<void>;
  }