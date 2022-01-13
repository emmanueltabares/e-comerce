import { Router } from 'express';
import { OrderController } from '../controller/orders';
import { validateJWT } from '../middlewares/validateToken';

const router = Router();

/**
* @swagger
*
* components:
*   schemas:
*       finallyOrder:
*           properties:
*               orderId: 
*                   type: string
*           required:
*               - orderId
*           example:
*               orderId: 61de115debf33e27a008808f
*/


/** 
 * @swagger
*  /api/orders/{orderId}:
*   get:
*       summary: Return an Order of user
*       security:
*        - bearerAuth: []
*       parameters:
*        - in: path 
*          name: orderId
*          schema:
*            type: string
*          required: true
*       tags: [Orders]
*       responses:
*        200:
*         description: Order
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
*                  $ref: '#/components/schemas/badRequest'
*/

/**
* @swagger
*  /api/orders/:
*   get:
*       summary: Return all orders of user
*       security:
*        - bearerAuth: []
*       tags: [Orders]
*       responses:
*        200:
*         description: Order
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
*                  $ref: '#/components/schemas/badRequest'
*/
router.get('/:id?', validateJWT, OrderController.getOrdenes);

/**
* @swagger
*  /api/orders:
*   post:
*      summary: Finally order
*      security:
*        - bearerAuth: []
*      tags: [Orders]
*      requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/finallyOrder'
*      responses:
*        200:
*         description: Order
*         content:
*           application/json:
*               schema:
*                 $ref: '#/components/schemas/finallyOrder/'
*        400:
*         description: Token invalid or expired
*         content:
*           application/json:
*               schema:
*                   $ref: '#components/schemas/tokenError'
*        401:
*         description: Unauthorized or uncompleted fields
*         content:
*          application/json:
*              schema:
*                  $ref: '#/components/chemas/badRequest' 
*/
router.post('/', validateJWT, OrderController.postOrden);

export default router;