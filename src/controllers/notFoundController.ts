import { Request, Response } from "express";
import customError from "../errors/customError";

export default function (_req: Request, res: Response) {
  return customError(res, 404, 'Route does not exist');
}