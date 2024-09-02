import { Request, Response } from "express";

import { serverError } from "../../errors";
import { ItemsResponseType, LanguageType } from "../../types";
import filterPhotoLang from "../../utils/filterPhotoLang";

export default async function (req: Request, res: Response) {
  try {
    const lang = req.params.lang as LanguageType;
    const response = req.body.response as ItemsResponseType;

    const langItems = response.items.map(item => ({
      ...item,
      category: { ...item.category, name: item.category.name[lang] },
      name: item.name[lang],
      description: item.description[lang],
      photos: filterPhotoLang(item.photos, lang),
    }));
    
    return res.json({ ...response, items: langItems });
  } catch (error) {
    console.log(error);
    return serverError(res);
  } 
}