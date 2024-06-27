import { Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

import { customError, handlePrismaErrors } from "../../errors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../../prisma";

export default async function(req: Request, res: Response) {
  const cookies = req.cookies;

  if (!cookies.jwt) return customError(res, 401, 'Unauthorized');
  const refreshToken = cookies.jwt;
  
   try {
    const user = await prisma.user.findFirst({
      where: {
        refreshToken
      }
    });

    if (!user) return customError(res, 403, 'Forbidden');

    const handleVerification = (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err || user.username !== (decoded as JwtPayload)?.username) return customError(res, 403, 'Forbidden');
      const jwtPayload = decoded as JwtPayload;
      
      const accessToken = jwt.sign(
        { username: jwtPayload.username},
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: '30m' }
      );

      return res.json({ ok: true, accessToken });
    };

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
      handleVerification
    );
   } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    return handlePrismaErrors(res, prismaError); 
   }
}