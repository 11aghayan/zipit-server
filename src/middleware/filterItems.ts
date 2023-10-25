import { NextFunction, Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import prisma from "../prisma";
import handlePrismaErrors from "../errors/handlePrismaErrors";

export default async function(req: Request, res: Response, next: NextFunction) {
  const promo = req.query.promo;
  const categories: string[] | undefined = req.query.categories?.toString().split(',') || undefined;
  const page = Number(req.query.page || 1);
  
  const count = 12; 
  const start = (page - 1) * count;

  try {
    const items = await prisma.item.findMany({
      skip: start,
      take: count,
      where: {
        category: {
          is: {
            id: {
              in: categories
            }
          }
        },
        promo: promo === 'true' ? {
          gt: 0
        } : undefined
      }
    });

    const allItemsLength = await prisma.item.count();
    const pages = Math.ceil(allItemsLength / count);
    
    const response = { page, items, length: items.length, pages };

    req.body.response = response;
    
    next();
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    return handlePrismaErrors(res, prismaError);
  }
}