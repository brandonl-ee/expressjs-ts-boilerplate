import express from 'express';
import { login, register, logout, refreshTokens } from '../controllers/auth.controller';
import asyncWrapper from '../middlewares/asyncWrapper.middleware';
import passport from 'passport';
import { authenticateWithHeaders } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', asyncWrapper(register));
router.post('/login', asyncWrapper(login));

// Example with custom authentication middleware
router.post('/logout', authenticateWithHeaders, asyncWrapper(logout));
router.post('/refresh-token', authenticateWithHeaders, asyncWrapper(refreshTokens));

// Example for passport jwt authentication.
router.get('/protected-route', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'You are authenticated!' });
});

export default router;
