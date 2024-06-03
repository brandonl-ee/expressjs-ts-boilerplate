import { Request, Response, NextFunction, RequestHandler } from 'express';

// To catch any error in controller
// Purpose: don't want to write try-catch block in controller.
const asyncWrapper = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncWrapper;
