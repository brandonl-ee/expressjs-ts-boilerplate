import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';
import configs from '../constants/config';
import { JWTTokens } from '../interfaces/auth.interface';

const generateTokens = (user: IUser): JWTTokens => {
  const payload = { _id: user._id };
  const accessToken = jwt.sign(payload, configs.JWT_SECRET, { expiresIn: configs.ACCESS_TOKEN_EXPIRY });
  const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, { expiresIn: configs.REFRESH_TOKEN_EXPIRY });
  user.refreshToken = refreshToken;
  user.save();
  return { accessToken, refreshToken };
};

export { generateTokens };
