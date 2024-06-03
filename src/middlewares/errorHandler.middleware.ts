import { NextFunction, Request, Response } from 'express';
import AuthenticationError from '../exceptions/auth.exception';
import CustomError from '../exceptions/custom.exception';
import { HTTP_STATUS_CODE } from '../constants/httpStatusCode';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let response: { [key: string]: any } = { message: 'Internal Server Error' };
  let errorCode: number = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;

  if (err instanceof AuthenticationError) {
    response = {
      message: 'Unauthorized: ' + err.message,
      data: err.data ?? undefined,
    };
    errorCode = HTTP_STATUS_CODE.UNAUTHORIZED;
  }

  if (err instanceof CustomError) {
    errorCode = err.code;
    response = {
      message: err.message,
      data: err.data ?? undefined,
    };
  }

  if (err.message && err.message !== '') {
    response.message = err.message;
  }

  return res.status(errorCode).json(response);
};

export { errorHandler };
