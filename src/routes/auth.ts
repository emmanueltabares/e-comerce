import { Router } from 'express';
import { authController } from '../controller/auth';
import { validateLogin, validateAuth } from '../middlewares/validations';

const router = Router();

/**
 * @swagger
 *  components:
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  
 *  
 *   schemas:
 *      User:
 *        type: object
 *        properties:
 *          firstName: 
 *            type: string
 *          lastName:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *          username:
 *            type: string
 *          password:
 *            type: string
 *            writeOnly: true
 *          direction:
 *            type: object
 *            properties:
 *              calle:
 *                type: string
 *              altura:
 *                type: string
 *              cp:
 *                type: string
 *              piso:
 *                type: number
 *              depto:
 *                type: string
 *          admin:
 *            type: boolean
 *        required:
 *          - firstName
 *          - lastName
 *          - email
 *          - phone
 *          - username
 *          - password
 *        example:
 *          firstname: Carlos
 *          lastname: Rodriguez
 *          email: carlos@coder.com
 *          phone: "123456789"
 *          username: carlos123   
 *          password: Carlos123
 *          repeat_password: Carlos123
 *          calle: Calle falsa
 *          altura: "123"
 *          cp: "1674"
 *          piso: "1" 
 *          depto: A
 *          admin: true
 * 
 *      loginUser:
 *       type: object
 *       properties:
 *          email:
 *            type: string
 *            format: email
 *          password:
 *            type: string
 *            writeOnly: true
 * 
 *      validationsErrors:
 *       type: object
 *       properties:
 *          msg:
 *           type: string
 *          param:
 *            type: string
 *          location: 
 *            type: string
 * 
 *      badRequest:
 *       type: object    
 *       properties:
 *         msg:
 *          type: string
 *         errors:
 *          type: array
 *          items: 
 *            $ref: '#/components/schemas/validationsErrors'   
 *         stacKTrace:
 *             type: array
 *             items: 
 *               type: string
 */     

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: Login user
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/loginUser'
 *      responses:
 *       200:
 *         description: Bienvenido!! + tokenAccess
 *         content:
 *           application/json:  
 *       401:
 *         description: Unauthorized
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/badRequest'  
 */

router.post('/login', validateLogin, authController.login);

/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *      summary: Register user
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/User'
 *      responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:  
 *       400:
 *         description: Email already registred
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/badRequest'  
 *       500:
 *         description: Duplicated key value
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/badRequest'
 */

router.post('/signup', validateAuth, authController.signUp);

export default router;