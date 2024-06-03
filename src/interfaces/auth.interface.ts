import { Request } from 'express';
import { IUser } from './user.interface';

export interface IAuthRequest extends Request {
  user: IUser;
  accessToken: string;
}

export interface DecodedToken {
  _id: string;
  iat: number;
  exp: number;
}

export interface JWTTokens {
  accessToken: string;
  refreshToken: string;
}
