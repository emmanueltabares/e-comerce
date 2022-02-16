import { Request, Response, NextFunction } from "express";
import { ProductSchema, updateProductSchema } from "./schemas/products";
import { userSchema, authSchema, loginSchema } from './schemas/users';

export const validateAddProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await ProductSchema.validateAsync(req.body);
        next();
    } catch (error) {
        res.status(400).json({
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

export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userSchema.validateAsync(req.body);
        next();
    } catch (error) {
        res.json({
            msg: error
        }); 
    };
};

export const validateAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await authSchema.validateAsync(req.body);
        next();
    } catch (error) {
        res.json({
            msg: error
        }); 
    };
};

export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await loginSchema.validateAsync(req.body);
        next();
    } catch (error) {
        res.json({
            msg: error
        }); 
    };
};