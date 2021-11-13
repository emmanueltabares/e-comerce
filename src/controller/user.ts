import { Request, Response, NextFunction } from 'express';
import { userPersistance } from '../persistance/users';
import { UserQuery, UserI } from '../interfaces/users';

class User {
   
    async getUser(req: Request, res: Response) {
      const { id } = req.params;
  
      const user = id
        ? await userPersistance.get(id)
        : await userPersistance.get();
  
      res.json({
        data: user,
      });
    }
  
    async addUser(req: Request, res: Response) {
      const newUser = await userPersistance.add(req.body);
  
      res.json({
        msg: 'Usuario agregado',
        data: newUser,
      });
    }
  
    async updateUser(req: Request, res: Response) {
      const { id } = req.params;
      const { body } = req.body;

      const newUser = await userPersistance.update(id, body)

      res.json({
        msg: 'usuario actualizado',
        data: newUser
      });
    }
  
    async deleteUser(req: Request, res: Response) {
      const { id } = req.params;
  
      const user = await userPersistance.delete(id);
      res.json({
        msg: 'Usuario eliminado',
        data: user
      });
    }

    async query(username?: string, email?: string): Promise<UserI> {
        const query = {
          $or: [] as UserQuery[],
        };
    
        if (username) query.$or.push({ username });
        if (email) query.$or.push({ email });
    
        return userPersistance.query(query);
      }

    async ValidatePassword(username: string, password: string) {
        return userPersistance.validateUserPassword(username, password);
      }
  }
  
  export const userController = new User();