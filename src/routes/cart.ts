import { Router } from 'express';
import { CartController } from '../controller/carts';
import { validateJWT } from '../middlewares/validateToken';

const router = Router();

/** 
* @swagger
* components:
*   schemas:
*    Cart:
*      type: object
*      properties:
*        id:
*          type: string
*          description: ID of user
*      example:
*         id: 619eef3f96c7d3f1fc2a8d48
*         userId: 619eef3f96c4d3f1fc2a4l38
*         products: []
*/

/** 
*   @swagger
*   /cart/:id:
*    get:
*      summary: Get cart product of user
*      responses:
*       200:
*         description: Cart product
*         content:
*           application/json:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Cart/'
*/
router.get('/:id', validateJWT, CartController.getCartByUser);

/** 
*   @swagger
*   /cart/:
*    post:
*      summary: Add product to cart
*      responses:
*       200:
*         description: Product added
*         content:
*           application/json:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Cart/'
*/
router.post('/', validateJWT, CartController.addProduct);

/** 
*   @swagger
*   /cart/:id:
*    delete:
*      summary: delete product of cart
*      responses:
*       200:
*         description: product deleted saccessfully
*         content:
*           application/json:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Cart/'
*/
router.delete('/delete', validateJWT, CartController.deleteProduct);

export default router;