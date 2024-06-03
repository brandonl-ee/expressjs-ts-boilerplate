import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { generateTokens } from '../utils/auth';
import { HTTP_STATUS_CODE } from '../constants/httpStatusCode';
import CustomError from '../exceptions/custom.exception';
import { IAuthRequest } from '../interfaces/auth.interface';

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await authService.registerUser(name, email, password);

  const tokens = generateTokens(user);
  res.status(HTTP_STATUS_CODE.CREATED).json({
    id: user._id,
    name: user.name,
    email: user.email,
    ...tokens,
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await authService.userLogin(email, password);
  res.status(HTTP_STATUS_CODE.OK).json(user);
};

const refreshTokens = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) throw new CustomError('No token provided', HTTP_STATUS_CODE.BAD_REQUEST);
  const newTokens = await authService.refreshUserTokens(refreshToken);

  res.status(HTTP_STATUS_CODE.OK).json(newTokens);
};

const logout = async (req: Request, res: Response) => {
  const request = req as IAuthRequest;

  // Client side pass refresh token to logout
  const { refreshToken } = request.body;

  if (!refreshToken) {
    throw new CustomError('No token provided');
  }
  const isLoggedOut = await authService.logoutUser(refreshToken, request.user._id);
  if (!isLoggedOut) throw new CustomError('Log out unsuccessful');

  res.status(HTTP_STATUS_CODE.OK).json({ message: 'User logged out successfully.' });
};

export { register, login, logout, refreshTokens };
