import { NextFunction, Request, Response } from "express";
import { customError } from "../errors";
import { LanguageStringType } from "../types";

export default function (req: Request, res: Response, next: NextFunction) {
  const label = req.body.label as LanguageStringType;
    
  if (!label) return customError(res, 400, 'Label not provided');
  
  if (!label.am) return customError(res, 400, 'Armenian label not provided');
  if (!label.ru) return customError(res, 400, 'Russian label not provided');

  next();
}