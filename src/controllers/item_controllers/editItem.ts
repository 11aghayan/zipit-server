import { Request, Response } from "express";

import { serverError } from "../../errors";
import okResponse from "../../utils/okResponse";
import prisma from "../../prisma";
import handlePrismaErrors from "../../errors/handlePrismaErrors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default async function (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { body } = req;

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
        data: body
      });
      
      const oldCategoryId = oldItem?.category;
      
      await prisma.category.update({
        where: {
          id: oldCategoryId,
          itemsQty: {

          }
        },
        data: {
          itemsQty: {
            decrement: 1
          }
        }
      });

      const newCategoryId = newItem?.category;
      
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