import { NextFunction, Request, Response } from "express";

import { SortType } from "../types";

export default async function(req: Request, res: Response, next: NextFunction) {

  const sortStr = req.query.sorting as SortType;
  if (!sortStr) {
    req.query.sorting = 'name,asc';
    return next();
  }

   const sort = sortStr.split(',');
  
  if (
    (sort[0] !== 'name' && sort[0] !== 'price')
    ||
    (sort[1] !== 'asc' && sort[1] !== 'desc')
  ) {
    req.query.sorting = 'name,asc';
  }
  
  next();
}