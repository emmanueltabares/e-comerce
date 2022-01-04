import { Router } from 'express'
import productsRouter from './products';
import userRouter from './user';
import authRouter from './auth';
import cartRouter from './cart';

const router = Router()

router.use('/products', productsRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/cart', cartRouter);

export default router;

