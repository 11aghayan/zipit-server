import { Request, Response } from "express";
import { serverError } from "../../errors";
import okResponse from "../../utils/okResponse";

export default async function (req: Request, res: Response) {
  try {
    // const { id } = req.params;

    // TODO: delete from db
    // TODO: get category, reduce qty by 1

    return okResponse(res);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}