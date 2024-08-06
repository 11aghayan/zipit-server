import { Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { serverError, handlePrismaErrors } from "../../errors";
import okResponse from "../../utils/okResponse";
import prisma from "../../prisma";

export default async function (req: Request, res: Response) {
  try {
    const { id } = req.params;

    try {
      const item = await prisma.item.delete({
        where: {
          id
        },
        select: {
          category: true
        }
      });

      await prisma.category.update({
        where: {
          id: item.category.id
        },
        data: {
          itemsQty: {
            decrement: 1
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