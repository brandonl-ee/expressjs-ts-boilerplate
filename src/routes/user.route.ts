import express from 'express';
import { getUser, getUsers } from '../controllers/user.controller.';
import asyncWrapper from '../middlewares/asyncWrapper.middleware';
import { authenticateWithHeaders } from '../middlewares/auth.middleware';

const router = express.Router();

// Example with custom authentication middleware
router.get('/', authenticateWithHeaders, asyncWrapper(getUsers));
router.get('/:id', authenticateWithHeaders, asyncWrapper(getUser));

export default router;
