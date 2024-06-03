import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { HTTP_STATUS_CODE } from '../constants/httpStatusCode';

// To get other user's details
const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.getUserDetail(id);

  res.status(HTTP_STATUS_CODE.OK).json(user);
};

const getUsers = async (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string) || 1;
  const limit: number = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const user = await UserService.getUserList({ limit, skip });

  res.status(HTTP_STATUS_CODE.OK).json({
    user,
    total: user.length,
  });
};

export { getUser, getUsers };
