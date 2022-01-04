import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { UserAPI } from '../apis/users';
import { Logger } from '../services/logger';
import { UserI } from '../interfaces/users';
import Config from '../config/config';

declare global {
  namespace Express {
    interface Request {
      usuario?: UserI;
    }
  }
}

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Token');

  if (!token) {
    return res.status(400).json({
      msg: 'Token invalid or inexists',
    });
  }

  try {
    const decoded: any = jwt.verify(token, Config.JWT_SECRET_KEY);

    if (!decoded) {
      res.status(400).json({
        msg: 'Invalid token',
      });
    }
    const usuario = await UserAPI.get(decoded.id as string);

    if (!usuario) {
      return res.status(401).json({
        msg: 'Unathorized.',
      });
    }
    req.user = usuario;
    next();
  } catch (error) {
    Logger.error(error);
    next(error);
  }
};