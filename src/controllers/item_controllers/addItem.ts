import { Request, Response } from "express";
import { serverError } from "../../errors";
import okResponse from "../../utils/okResponse";
import prisma from "../../prisma";

export default async function (req: Request, res: Response) {
  try {
    const { body } = req;
    const categoryId = body?.category; 

    await prisma.item.create({
      data: body
    });
    
    await prisma.category.update({
      where: {
        id: categoryId
      },
      data: {
        itemsQty: {
          increment: 1
        }
      }
    });

    return okResponse(res, 201);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}