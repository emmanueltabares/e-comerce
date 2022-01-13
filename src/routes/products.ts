import { Router } from 'express'
import { productsController } from '../controller/products';
import { validateAddProduct, validateUpdateProduct } from '../middlewares/validations';
import { checkProductExists } from '../middlewares/products';
import { validateJWT } from '../middlewares/validateToken';
import { isAdmin } from '../middlewares/admin';

const router = Router()

/** 
* @swagger
* components:
*   schemas:
*    Product:
*      type: object
*      properties:
*        id:
*          type: string
*        name:
*          type: string
*        cod: 
*          type: string
*        description:
*          type: string
*        photos:
*          type: Array
*        price:
*          type: string
*        stock:
*          type: string
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
*   
*    newProduct:
*      type: object
*      properties:
*        name:
*          type: string
*        cod: 
*          type: string
*        description:
*          type: string
*        photos:
*          type: Array
*        price:
*          type: string
*        stock:
*          type: string
*      required:
*         - name
*         - cod
*         - description
*         - price
*         - stock
*      example:
*         name: Smart Tv
*         cod: 20
*         description: Something description 
*         photos: ["Image1", "Image2"]
*         price: 100
*         stock: 10    
*
*    tokenError:
*       type: object    
*       properties:
*         msg:
*          type: string   
*         stacKTrace:
*             type: array
*             items: 
*               type: string
*
*/

/** 
* @swagger
*
*  /api/products/:
*   get:
*      summary: Return a product list
*      tags: [Product]
*      responses:
*       200:
*         description: List of products
*         content:
*           application/json:
*               $ref: '#/components/schemas/Product'
*       204:
*         description: "Product not found"
*         content:
*          application/json:
*              schema:
*                  $ref: '#/components/chemas/badRequest'
*/

/** 
* @swagger
*
*  /api/products/{productId}:
*   get:
*      parameters:
*       - in: path 
*         name: productId
*         schema:
*           type: string
*         required: true
*      summary: Return a product list
*      tags: [Product]
*      responses:
*       200:
*         description: List of products
*         content:
*           application/json:
*               $ref: '#/components/schemas/Product'
*       204:
*         description: "Product not found"
*/
router.get('/:id?', checkProductExists, productsController.getProducts); 

/** 
*   @swagger
*   /api/products:
*    post:
*      security:
*       - bearerAuth: []
*      summary: add a product
*      tags: [Product]
*      requestBody:
*       required: true
*       content:
*            application/json:
*              schema:
*                  $ref: '#/components/schemas/newProduct'
*      responses:
*       201:
*         description: Product added
*         content:
*           application/json:
*               schema:
*                 $ref: '#/components/schemas/Product'
*       
*
*       401:
*         description: Unauthorized or uncompleted fields
*         content:
*          application/json:
*              schema:
*                  $ref: '#/components/chemas/badRequest'
*
*
*       400:
*         description: Token invalid or expired
*         content:
*           application/json:
*               schema:
*                   $ref: '#/components/schemas/tokenError'
*/
router.post('/', validateJWT, isAdmin, validateAddProduct, productsController.addProducts);

/** 
*   @swagger
*   /api/products/{productId}:
*    put:
*      security:
*       - bearerAuth: []
*      parameters:
*       - in: path
*         name: productId
*         schema:
*           type: string
*         required: true
*      summary: update a product
*      tags: [Product]
*      requestBody:
*       required: true
*       content:
*           application/json:
*             schema:
*                 $ref: '#/components/schemas/newProduct'
*      responses:
*       200:
*         description: Product updated
*         content:
*           schema:
*               ref: '#/components/schemas/Product/'
*       
*
*       401:
*         description: Unauthorized or uncompleted fields
*         content:
*          application/json:
*              schema:
*                  $ref: '#/components/chemas/badRequest'
*
*
*       400:
*         description: Token invalid or expired
*         content:
*           application/json:
*               schema:
*                   $ref: '#/components/schemas/tokenError'
*/
router.put('/:id', validateJWT, isAdmin, validateUpdateProduct, checkProductExists, productsController.updateProducts);

/** 
*   @swagger
*   /api/products/{productId}:
*    delete:
*      security:
*       - bearerAuth: []
*      parameters:
*       - in: path
*         name: productId
*         schema:
*           type: string
*         required: true
*      summary: Delete a product
*      tags: [Product]
*      responses:
*       200:
*         description: Product deleted
*         content:
*           application/json:
*               
*       401:
*         description: Unauthorized or uncompleted fields
*         content:
*          application/json:
*              schema:
*                  $ref: '#/components/chemas/badRequest'
*
*
*       400:
*         description: Token invalid or expired
*         content:
*           application/json:
*               schema:
*                   $ref: '#/components/schemas/tokenError'
*/
router.delete('/:id', validateJWT, isAdmin, checkProductExists, productsController.deleteProducts);

export default router;
