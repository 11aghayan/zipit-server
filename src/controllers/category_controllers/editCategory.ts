import type { Request, Response } from 'express';

import { serverError } from '../../errors';
import returnOk from '../../utils/returnOk';

export default async function (req: Request, res: Response) {
  try {
    // const { id } = req.params;
    // const { body } = req;

    // TODO: try to change in db. If id is not in db return 404

    return returnOk(res, 201);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}