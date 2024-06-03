import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserRepository from '../repositories/user.repository';
import { DecodedToken, IAuthRequest } from '../interfaces/auth.interface';
import AuthenticationError from '../exceptions/auth.exception';
import config from '../constants/config';

const userRepo = new UserRepository();

const authenticateWithCookies = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies['jwt'];

    if (!token) {
      throw new AuthenticationError('Token not found');
    }

    const jwtSecret = config.JWT_SECRET || '';
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    if (!decoded || !decoded._id) {
      throw new AuthenticationError('Invalid Token.');
    }

    const user = await userRepo.findById(decoded._id, '_id name email');
    if (!user) {
      throw new AuthenticationError('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// Middleware to check authentication using bearer token
const authenticateWithHeaders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('Unauthorized, no token provided.');
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = config.JWT_SECRET || '';
    if (!jwtSecret) {
      throw new Error('JWT secret is not defined.');
    }

    const decoded = jwt.verify(token, jwtSecret) as DecodedToken;

    if (!decoded || !decoded._id) {
      throw new AuthenticationError('Invalid token.');
    }

    const user = await userRepo.findOne({ _id: decoded._id }, '-password');
    if (!user) {
      throw new AuthenticationError('User not found.');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AuthenticationError('Invalid token.'));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new AuthenticationError('Token expired.'));
    } else {
      next(error);
    }
  }
};

// Role based control here.
// const authorize = (roles: string[]) => {
//   return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     if (req.user && roles.some((role) => req.user!.roles?.includes(role))) {
//       next();
//     } else {
//       throw new CustomError('Not authorized for this role', HTTP_STATUS_CODE.UNAUTHORIZED);
//     }
//   };
// };

export { authenticateWithHeaders, authenticateWithCookies };
