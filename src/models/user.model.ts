import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/user.interface';
import { COMMON_SCHEMA, COMMON_SCHEMA_OPTIONS } from './common.model';

const userSchema = new Schema<IUser>(
  {
    ...COMMON_SCHEMA,
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    refreshToken: { type: String, required: false },
    status: {
      type: String,
      enum: ['active', 'inactive', 'blocked'],
    },
  },
  {
    ...COMMON_SCHEMA_OPTIONS,
  },
);

export interface UserDocument extends IUser, Document {}

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('users', userSchema);

export default User;
