import { Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import prisma from "../../prisma";
import { ItemBodyType } from "../../types";
import { serverError,customError, handlePrismaErrors } from "../../errors";

export default async function (req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    try {
      
      const item = await prisma.item.findUnique({
        where: {
          id
        }
      });

      if (!item) return customError(res, 404, 'No Item Found');
  
      return res.json(item);
    } catch (error) {
      const prismaError = error as PrismaClientKnownRequestError;
      return handlePrismaErrors(res, prismaError);
    }
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}