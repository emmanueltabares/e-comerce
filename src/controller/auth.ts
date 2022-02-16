import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import { generateJWT } from '../modules/jwt';
import { Logger } from '../services/logger';
import Config from '../config/config';
import { UserAPI } from '../apis/users';
import { EmailService } from '../services/email';

declare module 'express-session' {
  interface SessionData {
    user: string;
  }
}

class Auth {
  
    async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserAPI.query(req.body.email);
      if (!user ) {
        res.status(401).json({ msg: 'Unauthorized'});
      }

      const validPassword = bcryptjs.compareSync(
        req.body.password,
        user.password,
      );
      if (!validPassword) {
        res.status(401).json({ msg: 'Unauthorized'});
      }

      const token: any = await generateJWT(user._id);
  
      return res.json({token: token, msg: `Bienvenido!` });
    } catch (err: any) {
      Logger.error(err);
      next(err);
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
        const { body } = req
        const userExist = await UserAPI.query(body.email);
      if (userExist) {
        const error: Error = new Error('Email already registred');
        throw error;
      }

      const newUsuario: any = {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        phone: body.phone,
        username: body.username,
        password: body.password,
        direction: {
          calle: body.calle,
          altura: body.altura,
          cp: body.cp,
          piso: body.piso || null,
          depto: body.depto || null,
        },
        admin: body.admin || false,
      };
      const user = await UserAPI.add(newUsuario);

      const destination = Config.ETHEREAL_EMAIL;
      const subject = 'New registration';
      const content = `
        <p> El usuario ${body.email} creo un usuario  </p>
        `;
      EmailService.sendEmail(destination, subject, content);
      return res.status(201).json(user);
    } catch (err: any) {
      Logger.error(err);
      next(err);
    }
  }
}

export const authController = new Auth();