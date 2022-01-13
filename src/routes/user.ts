import { Router } from 'express';
import { userController } from '../controller/user';
import { validateUser } from '../middlewares/validations';
import { validateJWT } from '../middlewares/validateToken';
import { isAdmin } from '../middlewares/admin';

const router = Router();

/** 
*   @swagger
*   /api/users/{userId}:
*    get:
*      summary: Return User
*      security:
*       - bearerAuth: []
*      tags: [Users]
*      parameters:
*       - in: path
*         name: userId
*         schema:
*           type: string
*         required: true
*      responses:
*       200:
*         description: User information
*         content:
*           application/json:
*               schema:
*                 $ref: '#/components/schemas/User'
*       400:
*         description: Token invalid or expired
*         content:
*           application/json:
*               schema:
*                   $ref: '#/components/schemas/tokenError'
*       401:
*         description: Unauthorized or uncompleted fields
*         content:
*          application/json:
*              schema:
*                  $ref: '#/components/chemas/badRequest'
*/

/** 
*   @swagger
*   /api/users/:
*    get:
*      summary: Return list of Users
*      security:
*       - bearerAuth: []
*      tags: [Users]
*      responses:
*       200:
*         description: List of User information
*         content:
*           application/json:
*               schema:
*                 $ref: '#/components/schemas/User'
*       400:
*         description: Token invalid or expired
*         content:
*           application/json:
*               schema:
*                   $ref: '#/components/schemas/tokenError'
*       401:
*         description: Unauthorized or uncompleted fields
*         content:
*          application/json:
*              schema:
*                  $ref: '#/components/chemas/badRequest'
*/
router.get('/:id?', validateJWT, isAdmin, userController.getUser);

/** 
*   @swagger
*   /api/users/{userId}:
*    delete:
*      summary: Delete user
*      security:
*       - bearerAuth: []
*      parameters:
*       - in: path
*         name: userId
*         schema:
*           type: string
*         required: true
*      tags: [Users]
*      responses:
*       200:
*         description: Deleted user successfully
*         content:
*           application/json:
*               
*       401:
*         description: Unauthorized or uncompleted fields
*         content:
*          application/json:
*              schema:
*                  $ref: '#/components/chemas/badRequest'
*       400:
*         description: Token invalid or expired
*         content:
*           application/json:
*               schema:
*                   $ref: '#/components/schemas/tokenError'
*/
router.delete('/:id', validateJWT, isAdmin, userController.deleteUser);

export default router;