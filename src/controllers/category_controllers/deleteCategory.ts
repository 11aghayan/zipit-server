import { Request, Response } from "express";
import { serverError } from "../../errors";
import okResponse from "../../utils/okResponse";

export default async function (req: Request, res: Response) {
  try {
    // const { id } = req.params;


    // TODO: Find category in db by id, if id is wrong return error
    // TODO: If qty > 0 return error
    // TODO: Delete category

    return okResponse(res);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}