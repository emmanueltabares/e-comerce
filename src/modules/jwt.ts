import Config from '../config/config';
import { sign } from 'jsonwebtoken';

export const generateJWT = async (id: string) => {

   return new Promise((resolve, reject) => {
    const payload = id.toString();
    console.log(payload);
    sign(
      { id: payload },
      Config.JWT_SECRET_KEY,
      {
        expiresIn: Config.TOKEN_KEEP_ALIVE
      },
      (err, token) => {
        if (err) {
          reject('No se pudo generar el token');
        } else {
          resolve(token);
        }
      },
    );
  }); 
};