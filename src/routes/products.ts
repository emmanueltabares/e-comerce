import { Router } from 'express'
import { productsController } from '../controller/products';
import { validateAddProduct, validateUpdateProduct } from '../middlewares/validations';
import { checkProductExists } from '../middlewares/products';
import { validateJWT } from '../middlewares/validateToken';

const router = Router()

/** 
* @swagger
* components:
*   schemas:
*    product:
*      type: object
*      properties:
*        id:
*          type: string
*          description: ID of product
*        name:
*          type: string
*          description: Name of product
*        cod: 
*          type: string
*          description: Code of product
*        description:
*          type: string
*          description: Description of product
*        photos:
*          type: Array
*          description: Images of products
*        price:
*          type: string
*          description: Price of product
*        stock:
*          type: string
*          description: Stock of product
*      required:
*         - name
*         - cod
*         - description
*         - price
*         - stock
*      example:
*         id: 619eef3f96c7d3f1fc2a8d48
*         name: Smart Tv
*         cod: 20
*         description: Something description 
*         photo: ["Image1", "Image2"]
*         price: 100
*         stock: 10
*/

/** 
*   @swagger
*   /products/:
*    get:
*      summary: Return a product list
*      responses:
*       200:
*         description: List of products
*         content:
*           application/json:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Product/'
*/
router.get('/:id?', validateJWT, checkProductExists, productsController.getProducts); 

/** 
*   @swagger
*   /products:
*    post:
*      summary: add a product
*      responses:
*       200:
*         description: Product added
*         content:
*           application/json:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Product/'
*/
router.post('/', validateJWT, validateAddProduct, productsController.addProducts);

/** 
*   @swagger
*   /products/:id:
*    put:
*      summary: update a product
*      responses:
*       200:
*         description: Product updated
*         content:
*           application/json:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Product/'
*/
router.put('/:id', validateJWT, validateUpdateProduct, checkProductExists, productsController.updateProducts);

/** 
*   @swagger
*   /products/:id:
*    delete:
*      summary: Delete a product
*      responses:
*       200:
*         description: Product deleted
*         content:
*           application/json:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Product/'
*/
router.delete('/:id', validateJWT, productsController.deleteProducts);

export default router;
