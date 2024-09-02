import { NextFunction, Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import prisma from "../prisma";
import { handlePrismaErrors } from "../errors";
import { LanguageType, SortType } from "../types";

export default async function(req: Request, res: Response, next: NextFunction) {
  const lang  = req.params.lang as LanguageType || 'am'; 
  const promo = req.query.promo;
  const sort = (req.query.sorting as SortType).split(',');
  const categoriesString: string = req.query.categories as string;
  const categories: string[] | undefined = categoriesString?.split(',') || undefined;
  const page = Number(req.query.page || 1);
  
  const count = 20;
  const start = (page - 1) * count;

  const orderByName = {
    [sort[0]]: {
      [lang]: sort[1]  
    }
  };

  const orderByPrice = {
    [sort[0]]: sort[1]
  };

  try {
    const items = await prisma.item.findMany({
      orderBy: sort[0] === 'name' ? orderByName : orderByPrice,
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

    const itemsLength = await prisma.item.count({
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

    const pages = Math.ceil(itemsLength / count);
    
    const response = { page, items, length: items.length, pages };

    req.body.response = response;
    
    next();
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    return handlePrismaErrors(res, prismaError);
  }
}