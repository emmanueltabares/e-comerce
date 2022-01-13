import { Router } from 'express'
import productsRouter from './products';
import userRouter from './user';
import authRouter from './auth';
import cartRouter from './cart';
import orderRouter from './order';

const router = Router()

router.use('/products', productsRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/cart', cartRouter);
router.use('/orders', orderRouter)

export default router;

