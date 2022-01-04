import { Router } from 'express';
import { authController } from '../controller/auth';
import { validateLogin, validateAuth } from '../middlewares/validations';

const router = Router();

/** 
*   @swagger
*   /auth/login/:
*    post:
*      summary: Login user for use API
*      responses:
*       200:
*         description: Welcome User!
*         content:
*           application/json:
*               type: object
*/
router.post('/login', validateLogin, authController.login);

/** 
*   @swagger
*   /auth/login/:
*    post:
*      summary: Register user for use API
*      responses:
*       200:
*         description: Welcome User + Token access
*         content:
*           application/json:
*               type: object
*/
router.post('/signup', validateAuth, authController.signUp);

export default router;