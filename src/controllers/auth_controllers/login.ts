import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { serverError } from "../../errors";
import customError from "../../errors/customError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import handlePrismaErrors from "../../errors/handlePrismaErrors";
import prisma from "../../prisma";

export default async function(req: Request, res: Response) {
  try {
    const { password, user } = req.body;
     
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) return customError(res, 401, 'Wrong Credentials');
    
    const accessToken = jwt.sign(
      { username: user.username }, 
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { username: user.username }, 
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: '1d' }
    );
    
    try {
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          refreshToken: refreshToken
        }
      });

      const maxAge = 24 * 60 * 60 * 1000;
      
      res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', maxAge, secure: true });
      res.header('Access-Control-Allow-Origin', 'https://zipit-admin.vercel.app');
      return res.json({ ok: true, accessToken });
    } catch (error) {
      const prismaError = error as PrismaClientKnownRequestError;
      return handlePrismaErrors(res, prismaError);
    }
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
} 