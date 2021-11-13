import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { userController } from '../controller/user';
import { validateUser } from '../middlewares/validations';

const router = Router();

router.get('/:id?', asyncHandler(userController.getUser));

router.post(
  '/',
  validateUser,
  asyncHandler(userController.addUser)
);

router.put('/', asyncHandler(userController.updateUser));

router.delete('/', asyncHandler(userController.deleteUser));

export default router;