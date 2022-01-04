import mongoose, { Schema } from 'mongoose';
import { MongoDB } from '../../services/mongodb';
import bcrypt from 'bcrypt';
import { UserI } from '../../interfaces/users';

const userSchema = new Schema<UserI>({
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
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
    direction: {
      calle: {
        type: String,
        required: true,
      },
      altura: {
        type: String,
        required: true,
      },
      cp: {
        type: String,
        required: true,
      },
      piso: {
        type: Number,
      },
      depto: {
        type: String,
      },
    },
    admin: {
      type: Boolean,
      required: true,
    }
});

userSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  this.password = hash;
  next();
});

const MongoAtlas = new MongoDB();
const AtlasMongoose = MongoAtlas.getConnection();
export const UserModel = AtlasMongoose.model<UserI>('users', userSchema);