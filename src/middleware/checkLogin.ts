import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import prisma from "../prisma";
import { customError, handlePrismaErrors, serverError } from '../errors';

export default async function(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;

  try {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username
        }
      });

      if (!user) {
        // Comparing fake password with given one to match checking time even if username is not correct
        await bcrypt.compare(password, process.env.FAKE_PASSWORD!);
        return customError(res, 401, 'Wrong Credentials');
      }

      req.body.user = user;
      next();
    } catch (error) {
      const prismaError = error as PrismaClientKnownRequestError;
      return handlePrismaErrors(res, prismaError);
    }
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}