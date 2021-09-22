import { Router } from 'express';
import productosRouter from './productosRouter';
import cartRouter from './cartRouter';

const router = Router();

router.use('/products', productosRouter)
router.use('/cart', cartRouter)

export default router;