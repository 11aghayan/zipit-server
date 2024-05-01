import { Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { serverError, handlePrismaErrors } from "../../errors";
import okResponse from "../../utils/okResponse";
import prisma from "../../prisma";

export default async function (req: Request, res: Response) {
  try {
    const { id } = req.params;

    try {
      await prisma.category.delete({
        where: {
          id,
          itemsQty: {
            lt: 1
          }
        }
      });
    } catch (error) {
      const prismaError = error as PrismaClientKnownRequestError;
      
      return handlePrismaErrors(res, prismaError, 'categoryDelete');
    }

    return okResponse(res);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}