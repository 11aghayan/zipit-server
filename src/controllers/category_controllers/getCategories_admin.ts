import { Request, Response } from "express";

import { serverError } from "../../errors";
import prisma from "../../prisma";

export default async function (req: Request, res: Response) {
  try {

    const categories = await prisma.category.findMany();
    
    return res.json(categories);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}