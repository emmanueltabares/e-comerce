import { Request, Response } from 'express';

declare module 'express-session' {
    interface SessionData {
      loggedIn: boolean;
    }
  }

const user = "Manu";
const pass = 1234;

export const loginUser = (req: Request, res: Response): void => {

    const { userName, userPass } = req.body;
  
    if (userName == user && userPass == pass) {

      let session = req.session.loggedIn
      session = true;
        return res.render('index.pug', { userName })
    
    } else {
      res.status(401).json({
        error: `Error`,
        message: 'No Autorizado',
      });
    }
  };
  
  export const logoutUser = (req: Request, res: Response): void => {
    req.session.destroy(err => {
      if (err) res.status(500).json({ msg: 'Ocurrió un error' });
      else {
        res.json({msg: "Hasta pronto!"})
        setTimeout(() => {
            res.redirect('login.pug')
        }, 2000);
      }
    });
  };

  export const singUpUser = (req: Request, res: Response): void => {
    res.json({ data: { message: 'Registro exitoso' } });
  };