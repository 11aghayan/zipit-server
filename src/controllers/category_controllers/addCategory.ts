import type { Request, Response } from 'express';

import { serverError } from '../../errors';
// import { LanguageStringType } from '../../types';
import okResponse from '../../utils/okResponse';

export default async function (req: Request, res: Response) {
  try {
    // const label = req.body.label as LanguageStringType;

    // TODO: add to db

    return okResponse(res, 201);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}