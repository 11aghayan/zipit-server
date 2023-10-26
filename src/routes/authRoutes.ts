import express from 'express';
import { changePassword, login, logout, refreshToken } from '../controllers/auth_controllers';
import { checkLogin, checkPasswordChange, verifyJWT } from '../middleware';

const authRouter = express.Router();

// Protected routes
authRouter.put('/', verifyJWT, checkPasswordChange, changePassword);

// Not Protected routes
authRouter.post('/login', checkLogin, login);
authRouter.get('/refresh', refreshToken);
authRouter.post('/logout', logout);

export default authRouter;