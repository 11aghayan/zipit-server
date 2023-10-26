import express from 'express';
import { login, logout, refreshToken } from '../controllers/auth_controllers';
import { checkLogin } from '../middleware';

const authRouter = express.Router();

authRouter.post('/login', checkLogin, login);
authRouter.get('/refresh', refreshToken);
authRouter.get('/logout', logout);

export default authRouter;