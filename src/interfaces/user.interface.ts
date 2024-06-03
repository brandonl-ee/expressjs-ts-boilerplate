import { ICommon } from './common.interface';
import { Document } from 'mongoose';

export interface IUser extends ICommon, Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  refreshToken?: string | null;
  status?: 'active' | 'inactive' | 'blocked';
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}
