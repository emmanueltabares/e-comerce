import bcrypt from 'bcrypt';
import { UserModel } from '../models/schemas/user';
import { NewUserI, UserI } from '../interfaces/users';

export class Users {

  async get(id?: string): Promise<UserI[]> {
    let output: UserI[] = [];
    try {
      if (id) {
        const document = await UserModel.findById(id);
        if (document) output.push(document);
      } else {
        output = await UserModel.find();
      }

      return output;
    } catch (err) {
      return output;
    }
  }

  async add(data: NewUserI): Promise<UserI> {
    const newUser = new UserModel(data);
    await newUser.save();

    return newUser;
  }

  async update(id: string, data: NewUserI)/* : Promise<UserI> */ {
    /* const newUser = await UserModel.findByIdAndUpdate(id, data);
    return newUser;  */
  }

  async delete(id: string) {
    await UserModel.findByIdAndDelete(id);
  }

  async query(query: any): Promise<UserI> {
    const result = await UserModel.find(query);
    return result[0];
  }

  async validateUserPassword(
    username: string,
    password: string
  ): Promise<boolean> {
    const user = await UserModel.findOne({ username });

    if (!user) return false;

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) return false;
    return true;
  }
}

export const userPersistance = new Users();