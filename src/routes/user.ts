import { Router } from 'express';
import { userController } from '../controller/user';
import { validateUser } from '../middlewares/validations';
import { validateJWT } from '../middlewares/validateToken';

const router = Router();

/** 
* @swagger
* components:
*   schemas:
*    User:
*      type: object
*      properties:
*        id:
*          type: string
*          description: ID of product
*        firstname:
*          type: string
*          description: Name of product
*        lastname: 
*          type: string
*          description: Code of product
*        username:
*          type: string
*          description: Description of product
*        email:
*          type: Array
*          description: Images of products
*      required:
*         - firstname
*         - lastname
*         - username
*         - email
*      example:
*         id: 619eef3f96c7d3f1fc2a8d48
*         firstname: Pablo
*         lastname: Perez
*         username: pabloPere<21 
*         email: pablo@coder.com
*/

/** 
*   @swagger
*   /users/:id?:
*    get:
*      summary: List users
*      responses:
*       200:
*         description: Users
*         content:
*           application/json:
*               type: array
*               items:
*                 $ref: '#/components/schemas/User/'
*/
router.get('/:id?', validateJWT, userController.getUser);

/** 
*   @swagger
*   /users/:
*    post:
*      summary: Add user
*      responses:
*       200:
*         description: User added successfully
*         content:
*           application/json:
*               type: array
*               items:
*                 $ref: '#/components/schemas/User/'
*/
router.post('/', validateUser, userController.addUser);

/** 
*   @swagger
*   /users/:id:
*    put:
*      summary: Update user
*      responses:
*       200:
*         description: Updated user successfully
*         content:
*           application/json:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Users/'
*/
router.put('/:id', validateJWT, userController.updateUser);

/** 
*   @swagger
*   /users/:id:
*    delete:
*      summary: Delete user
*      responses:
*       200:
*         description: Deleted user successfully
*         content:
*           application/json:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Users/'
*/
router.delete('/:id', validateJWT, userController.deleteUser);

export default router;