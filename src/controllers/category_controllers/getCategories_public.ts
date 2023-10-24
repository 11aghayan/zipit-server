import { Request, Response } from "express";

import { LanguageType } from "../../types";
import { serverError } from "../../errors";
import prisma from "../../prisma";

export default async function (req: Request, res: Response) {
  try {
    const lang = req.params.lang as LanguageType;

    const categories = await prisma.category.findMany();

    // Leaving label matching lang
    const langCategories = categories.map(category => ({
      ...category,
      label: category.label[lang]
    })); 

    return res.json(langCategories);
  } catch (error) {
    return serverError(res);
  }
}