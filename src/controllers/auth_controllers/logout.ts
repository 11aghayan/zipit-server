import { Request, Response } from "express";

import prisma from "../../prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import handlePrismaErrors from "../../errors/handlePrismaErrors";
import okResponse from "../../utils/okResponse";

export default async function(req: Request, res: Response) {
  const { cookies } = req;

  if (!cookies.jwt) return okResponse(res, 204);
  const refreshToken = cookies.jwt;

  try {
    const user = await prisma.user.findFirst({
      where: {
        refreshToken
      }
    }); 
    
    if (!user) {
      res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' });

      return okResponse(res, 204);
    }
    
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        refreshToken: null
      }
    });
    
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });

    return okResponse(res);
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    return handlePrismaErrors(res, prismaError);
  }
}