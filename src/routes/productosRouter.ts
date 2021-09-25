import { Router } from "express";
import { productController } from "../controller/Producto";
import { checkAdmin } from "../middleware/admin";
import asyncHandler from 'express-async-handler';

const router = Router();

router.get('/:id?', productController.checkProductExists, asyncHandler(productController.getProducts))

router.post('/', checkAdmin, asyncHandler(productController.addProducts))

router.put('/:id', checkAdmin, asyncHandler(productController.updateProducts))

router.delete('/:id', checkAdmin, asyncHandler(productController.deleteProducts))

router.post('/test:cant?', asyncHandler(productController.postProductsTest))

export default router;