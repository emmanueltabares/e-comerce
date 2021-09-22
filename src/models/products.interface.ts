export interface ProductI {
    _id: string,
    title: string,
    description: string,
    stock: number,
    price: number,
    thumbnail: string,
    createat: Date;
}

export interface newProductI {
    title: string,
    description: string,
    stock: number,
    price: number,
    thumbnail: string,
    createat: Date;
}

export interface ProductQuery {
    nombre?: string;
    precio?: number;
    minPrice?: number;
    maxPrice?: number;
    minStock?: number;
    maxStock?: number;
  }

export interface ProductBaseClass {
    get(id?: string | undefined): Promise<ProductI[]>;
    add(data: newProductI): Promise<ProductI>;
    update(id: string, newProductData: newProductI): Promise<ProductI>;
    delete(id: string): Promise<void>;
    query(options: ProductQuery): Promise<ProductI[]>;
  }
