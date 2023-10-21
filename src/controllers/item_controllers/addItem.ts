import { Request, Response } from "express";
import { serverError } from "../../errors";
import okResponse from "../../utils/okResponse";

export default async function (req: Request, res: Response) {
  try {
    // const { body } = req;
    // TODO: add to db
    // TODO: get category, add qty by 1

    return okResponse(res, 201);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}