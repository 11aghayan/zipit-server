import { Request, Response } from "express";
// import { LanguageType } from "../../types";
import { serverError } from "../../errors";

export default async function (req: Request, res: Response) {
  try {
    // const lang = req.params.lang as LanguageType;

    // TODO: Get categories from DB
    // TODO: if categories.length > 0 filter categories by lang 

    const categories: [] = [];

    return res.json(categories);
  } catch (error) {
    return serverError(res);
  }
}