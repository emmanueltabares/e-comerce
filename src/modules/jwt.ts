import Config from '../config/config';
import { sign } from 'jsonwebtoken';

export const generateJWT = (id: string) => {

  return new Promise((resolve, reject) => {
    const payload = id.toString();

    sign(
      { id: payload },
      Config.JWT_SECRET_KEY,
      {
        
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