import { Request, Response } from "express";

import { serverError, handlePrismaErrors } from "../../errors";
import okResponse from "../../utils/okResponse";
import prisma from "../../prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default async function (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { body } = req;

    const data = {...body, username: undefined};

    try {
      const oldItem = await prisma.item.findUnique({
        where: {
          id
        }
      });

      const newItem = await prisma.item.update({
        where: {
          id
        },
        data
      });
      
      const oldCategoryId = oldItem?.category.id;
      
      await prisma.category.update({
        where: {
          id: oldCategoryId,
        },
        data: {
          itemsQty: {
            decrement: 1
          }
        }
      });

      const newCategoryId = newItem?.category.id;
      
      await prisma.category.update({
        where: {
          id: newCategoryId
        },
        data: {
          itemsQty: {
            increment: 1
          }
        }
      });
    } catch (error) {
      const prismaError = error as PrismaClientKnownRequestError;
      return handlePrismaErrors(res, prismaError);
    }
    
    return okResponse(res);
  } catch (error) {
    console.log(error);
    return serverError(res);
  } 
}