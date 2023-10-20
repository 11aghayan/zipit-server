import type { Request, Response } from 'express';

import { serverError } from '../../errors';
import returnOk from '../../utils/returnOk';
import customError from '../../errors/customError';

export default function async (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { body } = req;

    if (!id) return customError(res, 400, 'Category ID not provided');


    // TODO: try to change in db. If id is not in db return 404

    return returnOk(res, 201);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}