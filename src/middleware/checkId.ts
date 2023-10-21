import { NextFunction, Request, Response } from "express";
import customError from "../errors/customError";

export default function (req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  if (!id) return customError(res, 400, 'Id not provided');
  
  next();
}