import { NextFunction, Request, Response } from "express";

import { customError } from "../errors";

export default function(req: Request, res: Response, next: NextFunction) {
  const { password, newPassword, newPasswordRepeat } = req.body;
  const { cookies } = req;

  if (!cookies.jwt) return customError(res, 401, 'Unauthorized');

  if (!password) return customError(res, 400, 'Password not provided');
  if (!newPassword) return customError(res, 400, 'New Password not provided');
  if (!newPasswordRepeat) return customError(res, 400, 'New Password Repeat not provided');
  if (newPassword !== newPasswordRepeat) return customError(res, 400, 'Passwords do not match');
  if (newPassword.length < 8) return customError(res, 400, 'Password should contain at least 8 characters');

  next();
}