import { Request, Response } from "express";
import { serverError } from "../../errors";
import returnOk from "../../utils/returnOk";

export default async function (req: Request, res: Response) {
  try {
    // const { id } = req.params;

    // TODO: Try to delete category in db, if id is wrong return error

    return returnOk(res);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}