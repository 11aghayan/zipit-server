import type { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { serverError } from '../../errors';
import okResponse from '../../utils/okResponse';
import prisma from '../../prisma';
import handlePrismaErrors from '../../errors/handlePrismaErrors';

export default async function (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { label } = req.body;
    try {
      await prisma.category.update({
        where: {
          id
        },
        data: {
          label
        }
      });
    } catch (error) {
      const prismaError = error as PrismaClientKnownRequestError;

      return handlePrismaErrors(res, prismaError);
    }

    return okResponse(res, 200);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}