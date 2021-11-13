import { Router } from 'express'
import { productsController } from '../controller/products';
import { validateAddProduct, validateUpdateProduct } from '../middlewares/validations';

const router = Router()

router.get('/:id?', productsController.getProducts);
router.post('/', validateAddProduct, productsController.addProducts);
router.put('/id', validateUpdateProduct, productsController.updateProducts);
router.delete('/id', productsController.deleteProducts);

export default router;
