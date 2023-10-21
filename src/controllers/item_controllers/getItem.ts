import { Request, Response } from "express";
import { serverError } from "../../errors";

export default async function (req: Request, res: Response) {
  try {
    // const { lang, id } = req.params;
    
    // TODO: Get item by id
    // TODO: Filter by lang 

    const item = {};
    
    return res.json(item);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}