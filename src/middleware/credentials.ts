import { NextFunction, Request, Response } from "express";
import { allowedOrigins } from "../config/corsOptions";

export default function (req: Request, res: Response, next: NextFunction) {
  const { origin } = req.headers;
  console.log(origin);
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
}