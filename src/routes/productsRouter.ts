import { Router } from 'express'
import { productsController } from '../controller/products';
import { validateAddProduct, validateUpdateProduct } from '../middlewares/validations';
import { checkProductExists } from '../middlewares/products';

const router = Router()

router.get('/:id?', checkProductExists, productsController.getProducts);
router.post('/', validateAddProduct, productsController.addProducts);
router.put('/id', validateUpdateProduct, checkProductExists, productsController.updateProducts);
router.delete('/id', checkProductExists, productsController.deleteProducts);

export default router;
