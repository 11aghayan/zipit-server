import { Request, Response } from "express";
import { serverError } from "../../errors";

export default async function (req: Request, res: Response) {
  try {
    // const { promo } = req.query;
    // const categories = req.query.categories?.split(',') || null;
    // const page = Number(req.query.page || 1);

    // TODO: get items from db matching query

    // Filtering items by page
    // const count = 15;
    // const pages = Math.ceil(filteredItems.length / count); 
    // const start = (page - 1) * count;
    // const end = start + count;

    const items = { items: [], length: 0, page: 1};
    return res.json(items);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}