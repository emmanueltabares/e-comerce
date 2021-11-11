import { Request, Response, NextFunction } from 'express';

export const validateLogIn = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.loggedIn) next();
    else res.status(401).json({ msg: 'no estas autorizado' });
  };