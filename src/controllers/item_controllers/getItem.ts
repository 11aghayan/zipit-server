import { Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import handlePrismaErrors from "../../errors/handlePrismaErrors";
import prisma from "../../prisma";
import { ItemBodyType, LanguageType } from "../../types";
import { serverError } from "../../errors";
import filterPhotoLang from "../../utils/filterPhotoLang";
import customError from "../../errors/customError";

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

      if (!item) return customError(res, 404, 'No Item Found');
  
      // Leaving props that match lang
      const category = { ...item.category, name: item.category.name[lang] };
      const name = item.name[lang];
      const description = item?.description[lang];
      const photos = filterPhotoLang(item.photos, lang);

      const langItem = { ...item, name, description, photos, category };
  
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