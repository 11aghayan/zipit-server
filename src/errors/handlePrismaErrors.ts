import { Response } from "express";

import customError from "./customError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default function (res: Response, prismaError: PrismaClientKnownRequestError, categoryDelete: 'categoryDelete' | null = null) {
  console.error(prismaError);
  if (prismaError.code === 'P2023') return customError(res, 400, 'Incorrect ID');
  if (prismaError.code === 'P2025') {
    if (categoryDelete) return customError(res, 400, 'Category is not empty or ID was wrong');
    else return customError(res, 404, 'ID was not found');
  }
  throw new Error('Prisma Error');
}