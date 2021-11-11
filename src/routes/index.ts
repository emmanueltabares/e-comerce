import { Router } from 'express'
import productsRouter from './productsRouter';
import cartRouter from './productsRouter';
import loginRouter from './productsRouter';

const router = Router()

router.use('/products', productsRouter)
router.use('/cart', cartRouter)
router.use('/login', loginRouter)

export default router;