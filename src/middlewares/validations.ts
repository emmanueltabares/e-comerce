import { Request, Response, NextFunction } from "express";
import { ProductSchema, updateProductSchema } from "./schemas/products";

export const validateAddProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await ProductSchema.validateAsync(req.body);
        next();
    } catch (error) {
        res.json({
            msg: error
        });
    };
};

export const validateUpdateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await updateProductSchema.validateAsync(req.body);
        next();
    } catch (error) {
        res.json({
            msg: error
        });
    };
};