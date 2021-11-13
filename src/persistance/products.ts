import { ProductI, newProductI } from "../interfaces/products";
import { ProductModel } from "../models/schemas/product";

class Products {
    async find(id: string) {  
        let product;
        try {
            product = await ProductModel.findOne({ _id: id });
            return product;
        } catch (error) {
            return error;
        }
    }
    async get(id?: string) {
    

        let products: ProductI[] = [];
        
        try {
            if(id) {
                const product = await ProductModel.findById(id);
                if (product) products.push(product);
            } else {
                products = await ProductModel.find();
            }
            return products;
        } catch (error) {
            console.log(error)
        } 
    }


    async add(data: newProductI) {
    
        try {

            const newProduct = new ProductModel(data);
            await newProduct.save();

            return newProduct;
        } catch(error) {
        return error;
        }
        
    }
    async delete(id: string) {
        const product = await ProductModel.findByIdAndDelete(id);
        return product;
    }
    async update(id: string, newProductData: newProductI) {
        const updateProduct = await ProductModel.findByIdAndUpdate(id, newProductData);
        return updateProduct
      }

}

export const productsPersistance = new Products();