import { Request, Response } from "express";
import bcrypt from 'bcrypt';

import customError from "../../errors/customError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import handlePrismaErrors from "../../errors/handlePrismaErrors";
import prisma from "../../prisma";
import okResponse from "../../utils/okResponse";

export default async function(req: Request, res: Response) {
  const { password, newPassword } = req.body;

  const refreshToken = req.cookies.jwt;

  try {
    const user = await prisma.user.findFirst({
      where: {
        refreshToken
      }
    });

    if (!user) return customError(res, 403, 'Forbidden');

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) return customError(res, 401, 'Wrong password');

    const hashedPassword = await bcrypt.hash(newPassword, 15);
    
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        password: hashedPassword
      }
    });

    return okResponse(res);
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    return handlePrismaErrors(res, prismaError);
  }
}