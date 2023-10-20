import { Request, Response } from "express";
import { serverError } from "../../errors";
import customError from "../../errors/customError";
import returnOk from "../../utils/returnOk";

export default function async (req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) return customError(res, 400, 'Category ID not provided');

    // TODO: Try to delete category in db, if id is wrong return error

    return returnOk(res);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}