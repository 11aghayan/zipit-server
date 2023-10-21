import { Request, Response } from "express";
import { LanguageType } from "../../types";
import customError from "../../errors/customError";
import { serverError } from "../../errors";

export default async function (req: Request, res: Response) {
  try {
    const lang = req.params.lang as LanguageType;

    if (!lang) return customError(res, 400, 'Language param (lang) must be provided');
    if (lang !== 'ru' && lang !== 'am') return customError(res, 400, 'Language param (lang) must be either am or ru');

    // TODO: Get categories from DB
    // TODO: if categories.length > 0 filter categories by lang 

    const categories: [] = [];

    return res.json(categories);
    
  } catch (error) {
    return serverError(res);
  }
}