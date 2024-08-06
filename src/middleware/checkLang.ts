import { NextFunction, Request, Response } from "express";

import { customError } from "../errors";
import { LanguageType } from "../types";

export default async function(req: Request, res: Response, next: NextFunction) {
  const lang = req.params?.lang as LanguageType;

  if (!lang) return customError(res, 400, 'Language param (lang) must be provided');
  if (lang !== 'ru' && lang !== 'am') return customError(res, 400, 'Language param (lang) must be either am or ru');
  
  next();
}