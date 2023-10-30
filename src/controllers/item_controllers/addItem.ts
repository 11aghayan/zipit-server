import { Request, Response } from "express";
import { serverError } from "../../errors";
import okResponse from "../../utils/okResponse";
import prisma from "../../prisma";
import { ItemBodyType } from "../../types";

export default async function (req: Request, res: Response) {
  try {
    const body = req.body as ItemBodyType;
    const categoryId = body?.category.id; 

    const data = {...body, username: undefined};
    
    await prisma.item.create({
      data
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