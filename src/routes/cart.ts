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
*          description: ID of cart
*        userId:
*          type: string
*          description: ID of user
*        products:
*          type: object
*          description: List of prducts ID added to cart user
*      example:
*         id: 619eef3f96c7d3f1fc2a8d48
*         userId: 619eef3f96c4d3f1fc2a4l38
*         products: [618dabca34d57b0331ef63ba, 619eef3f96c7d3f1fc2a8d48, 619eefab0edd28ba2a121bd0]
*    
*    addProductToCart:
*      type: object
*      properties:
*          productId:
*             type: string
*             description: ID of product to add
*          productAmount:
*             type: number
*             description: Amount of products to add
*      required:
*       - productId
*       - productAmount 
*      example:
*       productId: 618dabca34d57b0331ef63ba
*       productAmount: 5
*
*
*/

/** 
* @swagger
*  /api/cart:
*    get:
*      security:
*       - bearerAuth: []
*      summary: Get cart of user
*      tags: [Cart]
*      responses:
*       200:
*         description: Cart products
*         content:
*           application/json:
*               schema:
*                 $ref: '#/components/schemas/Cart/'
*       400:
*         description: Token invalid or expired
*         content:
*           application/json:
*               schema:
*                   $ref: '#components/schemas/tokenError'
*/
router.get('/', validateJWT, CartController.getCartByUser);

/** 
* @swagger
*  /api/cart/:
*    post:
*      security:
*       - bearerAuth: []
*      summary: Add product to cart
*      tags: [Cart]
*      requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/addProductToCart'
*      responses:
*       200:
*         description: Product added to cart
*         content:
*           application/json:
*               schema:
*                 $ref: '#/components/schemas/Cart/'
*       400:
*         description: Token invalid or expired
*         content:
*           application/json:
*               schema:
*                   $ref: '#components/schemas/tokenError'
*/
router.post('/', validateJWT, CartController.addProduct);

/** 
* @swagger
*  /api/cart/:
*    delete:
*      summary: delete product of cart
*      security:
*       - bearerAuth: []
*      tags: [Cart]
*      requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/addProductToCart'
*      responses:
*       200:
*         description: product deleted saccessfully
*         content:
*           application/json:
*               schema:
*                 $ref: '#/components/schemas/Cart/'
*       400:
*         description: Token invalid or expired
*         content:
*           application/json:
*               schema:
*                   $ref: '#components/schemas/tokenError'
*       401:
*         description: Unauthorized or uncompleted fields
*         content:
*          application/json:
*              schema:
*                  $ref: '#/components/chemas/badRequest'
*/
 router.delete('/', validateJWT, CartController.deleteProducts); 

/**
* @swagger
*  /api/cart/submit:
*   post:
*      summary: Create an Order
*      security:
*       - bearerAuth: []
*      tags: [Cart]
*      responses:
*       200:
*         description: Su orden se generó correctamente
*         content:
*           application/json:
*               schema:
*                 $ref: '#/components/schemas/Cart/'
*       400:
*         description: Token invalid or expired
*         content:
*           application/json:
*               schema:
*                   $ref: '#components/schemas/tokenError'
*       401:
*         description: Unauthorized or uncompleted fields
*         content:
*          application/json:
*              schema:
*                  $ref: '#/components/chemas/badRequest'
 */

router.post('/submit', validateJWT, CartController.postCarrito)

export default router;