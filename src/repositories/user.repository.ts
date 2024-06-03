import { IUser } from '../interfaces/user.interface';
import User from '../models/user.model';
import BaseRepository from './base.repository';

export default class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  // You can add more methods here if needed
}
