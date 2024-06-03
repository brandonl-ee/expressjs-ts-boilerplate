import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import UserRepository from '../repositories/user.repository';
import { generateTokens } from '../utils/auth';
import { CustomError } from '../exceptions/custom.exception';
import { HTTP_STATUS_CODE } from '../constants/httpStatusCode';
import AuthenticationError from '../exceptions/auth.exception';
import jwt from 'jsonwebtoken';
import { DecodedToken, JWTTokens } from '../interfaces/auth.interface';
import config from '../constants/config';

class AuthService {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }
  async registerUser(name: string, email: string, password: string): Promise<IUser> {
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new CustomError('User already exists', HTTP_STATUS_CODE.BAD_REQUEST);
    }

    const user: IUser = await this.userRepository.create({
      name,
      email,
      password,
    });

    return user;
  }

  async userLogin(email: string, password: string): Promise<{ [key: string]: any }> {
    const user = await this.userRepository.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      throw new AuthenticationError('Invalid email or password');
    }

    const tokens = generateTokens(user);
    return { ...user.toObject(), ...tokens };
  }

  async refreshUserTokens(refreshToken: string): Promise<JWTTokens> {
    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET) as DecodedToken;
    const user = await this.userRepository.findById(decoded._id);

    if (!user || user.refreshToken !== refreshToken) {
      throw new AuthenticationError('Invalid token');
    }

    return generateTokens(user);
  }

  async logoutUser(refreshToken: string, userId: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({ _id: userId, refreshToken });

      if (!user) return false;

      user.refreshToken = null;
      await user.save();
      return true;
    } catch {
      throw new CustomError('Internal Server Error.', HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  }
}

export default new AuthService();
