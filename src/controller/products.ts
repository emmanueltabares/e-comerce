import { productsAPI } from "../apis/products";
import { Request, Response, NextFunction } from "express";

class Products {
  async getProducts(req: Request, res: Response) {
    const { id } = req.params;

    const product = id ? await productsAPI.get(id) : await productsAPI.get();

    if(!product.length) res.status(204).json({ msg: "No se encuentran productos" });

    res.json({
      data: product,
    });
  }

  async addProducts(req: Request, res: Response) {
    const newItem = await productsAPI.add(req.body);
    res.status(201).json({
      msg: "producto agregado con exito",
      data: newItem,
    });
  }

  async updateProducts(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    const newProduct = await productsAPI.update(id, body);
    console.log(id);
    console.log(body);

    res.json({
      msg: "actualizando producto",
      data: newProduct,
    });
  }

  async deleteProducts(req: Request, res: Response) {
    const { id } = req.params;

    await productsAPI.delete(id);
    res.status(200).json({
      msg: "producto borrado",
    });
  }
}

export const productsController = new Products();
