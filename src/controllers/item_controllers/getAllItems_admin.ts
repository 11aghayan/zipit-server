import { Request, Response } from "express";

import { serverError } from "../../errors";

export default async function (req: Request, res: Response) {
  try {
    const { response } = await req.body;

    return res.json(response);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}