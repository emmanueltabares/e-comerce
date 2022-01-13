import { ProductI, newProductI, BaseProductI } from "../../../interfaces/products";
import { ProductModel } from "../../schemas/product";

export class ProductsMongoDAO /* implements BaseProductI */ {
    
     async get(id?: string): Promise<ProductI[]> {
        let products: ProductI[] = [];
        
        try {
            if(id) {
                const product = await ProductModel.findById(id);
                if(product) products.push(product)
            } else {
                products = await ProductModel.find();
            }
            return products;
        } catch (error) {
            return products;
        } 
    } 

    async add(data: newProductI): Promise<ProductI> {

        const newProduct = new ProductModel(data);
        await newProduct.save();

        return newProduct;
       
    }
    async delete(id: string) {
        await ProductModel.findByIdAndDelete(id); 
   }
    async update(id: string, newProductData: newProductI) {
        return await ProductModel.findByIdAndUpdate(id, newProductData);
    }
}
