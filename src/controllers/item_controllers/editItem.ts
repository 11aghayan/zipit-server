import { Request, Response } from "express";
import { serverError } from "../../errors";
import okResponse from "../../utils/okResponse";

export default async function (req: Request, res: Response) {
  try {
    // const { id } = req.params;
    // const { body } = req;

    // TODO: Find in db by id and replace body, if id does not exist return error

    return okResponse(res);
  } catch (error) {
    console.log(error);
    return serverError(res);
  } 
}