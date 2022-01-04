import { Request, Response } from 'express';
import { UserAPI } from '../apis/users';
import { UserQuery, UserI } from '../interfaces/users';

class User {
   
    async getUser(req: Request, res: Response) {
      const { id } = req.params;
  
      const user = id
        ? await UserAPI.get(id)
        : await UserAPI.get();
  
      res.json({
        data: user,
      });
    }
  
    async addUser(req: Request, res: Response) {
      const newUser = await UserAPI.add(req.body);

      res.json({
        msg: 'Usuario agregado',
        data: newUser,
      });
    }
  
    async updateUser(req: Request, res: Response) {
      const { id } = req.params;
      const { body } = req.body;

      const newUser = await UserAPI.update(id, body)

      res.json({
        msg: 'usuario actualizado',
        data: newUser
      });
    }
    
    async deleteUser(req: Request, res: Response) {
      const { id } = req.params;
      const user = await UserAPI.delete(id);
      res.json({
        msg: 'Usuario eliminado',
        data: user
      });
    }

    async query(username?: string, email?: string): Promise<UserI> {
        const query: any = {
          $or: [] as UserQuery[],
        };
    
        if (username) query.$or.push({ username });
        if (email) query.$or.push({ email });
    
        return UserAPI.query(query);
      }
  }
  
  export const userController = new User();