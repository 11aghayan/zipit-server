import { NextFunction, Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import prisma from "../prisma";
import handlePrismaErrors from "../errors/handlePrismaErrors";

export default async function(req: Request, res: Response, next: NextFunction) {
  const promo = req.query.promo;
  const categories: string[] | undefined = req.query.categories?.toString().split(',') || undefined;
  const page = Number(req.query.page || 1);
  
  const count = 15; 
  const start = (page - 1) * count;

  try {
    const items = await prisma.item.findMany({
      skip: start,
      take: count,
      where: {
        category: {
          in: categories
        },
        promo: promo === 'true' ? {
          gt: 0
        } : undefined
      }
    });

    const response = { page, items };

    req.body.response = response;
    
    next();
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    return handlePrismaErrors(res, prismaError);
  }
}