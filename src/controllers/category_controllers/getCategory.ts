import { Request, Response } from "express";
import prisma from "../../prisma";
import { customError } from "../../errors";

export default async function getCategory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    const category = await prisma.category.findUnique({
      where: {
        id
      }
    });

    if (!category) return customError(res, 404, 'No category found with the given ID');

    return res.json(category);
    
  } catch (error) {
    
  }
}