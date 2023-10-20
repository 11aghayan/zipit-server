import { Request, Response } from "express";
import { serverError } from "../../errors";

export default function async (req: Request, res: Response) {
  try {
    // TODO: get categories from db

    const categories: [] = [];
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}