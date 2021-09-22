"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Producto_1 = require("../controller/Producto");
const router = (0, express_1.Router)();
router.get('/', Producto_1.productoController.getAllProducts);
router.get('/:id', Producto_1.productoController.getProductsById);
router.post('/', Producto_1.productoController.addProducts);
router.put('/:id', Producto_1.productoController.updateProducts);
router.delete('/:id', Producto_1.productoController.deleteProducts);
exports.default = router;