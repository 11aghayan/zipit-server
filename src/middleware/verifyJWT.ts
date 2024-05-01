import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

import { customError } from "../errors";

export default function(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return customError(res, 401, 'Unauthorized');
  
  const token = authHeader.split(' ')[1];

  const handleVerification = (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
    if (err) return customError(res, 403, 'Forbidden');
    const jwtPayload = decoded as JwtPayload;
    req.body.username = jwtPayload.username;
    next();
  };
  
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!,
    handleVerification
  );
}