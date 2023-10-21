import type { Request, Response } from 'express';

import { serverError } from '../../errors';
import okResponse from '../../utils/okResponse';

export default async function (req: Request, res: Response) {
  try {
    // const { id } = req.params;
    // const { body } = req;

    // TODO: try to change in db. If id is not in db return 404

    return okResponse(res, 201);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}