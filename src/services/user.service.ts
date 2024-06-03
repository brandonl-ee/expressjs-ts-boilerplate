import { IUser } from '../interfaces/user.interface';
import UserRepository from '../repositories/user.repository';
import { generateTokens } from '../utils/auth';
import { CustomError } from '../exceptions/custom.exception';

class UserService {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }
  async getUserDetail(id: string): Promise<IUser> {
    const user = await this.userRepository.findOne({ _id: id }, 'name email');

    if (!user) throw new CustomError('User not found');

    return user;
  }

  async getUserList({ limit, skip }: { limit: number; skip: number }): Promise<{ [key: string]: any }> {
    const user = await this.userRepository.find({}, {}, limit, skip);

    return user;
  }
}

export default new UserService();
