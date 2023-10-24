import { Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import handlePrismaErrors from "../../errors/handlePrismaErrors";
import prisma from "../../prisma";
import { ItemBodyType, LanguageType } from "../../types";
import { serverError } from "../../errors";

export default async function (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const lang = req.params.lang as LanguageType;
    
    try {
      
      const item = await prisma.item.findUnique({
        where: {
          id
        }
      }) as ItemBodyType;
  
      // Leaving props that match lang
      const name = item.name[lang];
      const description = item?.description[lang];
      const photos = item.photos.map(photo => ({
        ...photo,
        color: photo.color[lang]
      }));

      const langItem = { ...item, name, description, photos };
  
      return res.json(langItem);
    } catch (error) {
      const prismaError = error as PrismaClientKnownRequestError;
      return handlePrismaErrors(res, prismaError);
    }
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}