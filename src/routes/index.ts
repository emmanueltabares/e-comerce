import { Router } from 'express'
import productsRouter from './productsRouter';
import cartRouter from './productsRouter';
import userRouter from './userRouter';
import authRouter from './authRouter';
import { isLoggedIn } from '../middlewares/auth';

const router = Router()

router.use('/products', productsRouter);
router.use('/cart', isLoggedIn, cartRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter)

export default router;