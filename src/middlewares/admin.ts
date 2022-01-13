import { Request, Response, NextFunction } from "express";
import { UserI } from "../interfaces/users";

declare global {
  namespace Express {
    interface Request {
      usuario?: UserI;
    }
  }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    const user = req.user as any;
    const userAdmin = user.admin;
    if (userAdmin) {
      next();
    } else {
      res.status(401).json({
        msg: "Unauthorized",
      });
    }
  }
};
