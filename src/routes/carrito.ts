import {Router, Request, Response} from 'express';
import { carritoController } from '../controllers/carrito';

const router = Router();

router.get('/listar', carritoController.getCart)

router.get('/listar/:id', carritoController.getCart)

router.post('/agregar/:id_producto', carritoController.addProducts)

router.delete('/borrar/:id', carritoController.deleteCart)

export default router;