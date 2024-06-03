import { Router } from 'express';
import authRouter from './auth.route';
import usersRouter from './user.route';

// Create a new Router instance
const router = Router();

// Mount the routers
router.use('/auth', authRouter);
router.use('/user', usersRouter);

export default router;
