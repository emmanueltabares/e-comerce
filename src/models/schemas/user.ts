import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserI } from '../../interfaces/users';

const userSchema = new Schema<UserI>({
    username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      } 
});

userSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  this.password = hash;
  next();
});


export const UserModel = mongoose.model<UserI>('users', userSchema);