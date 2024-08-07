import { Request, Response } from "express";

import { serverError } from "../../errors";
import prisma from "../../prisma";
import { ItemType, LanguageType } from "../../types";
import filterItemsByLang from "../../utils/filterItemsByLang";
import getFirstAvailableColorAndSize from "../../utils/getFirstAvailableColorAndSize";

export default async function (req: Request, res: Response) {
  const lang = req.params?.lang as LanguageType;
  const randomItemsUrl = `https://${req.hostname}/api/v1/items/${lang}/random`;
  const { categoryId , name } = req.body;
  const elmCount = 10;  
  
  if (typeof categoryId !== 'string' || typeof name !== 'string') throw new Error(`Error during type check: Category ID type = ${typeof categoryId}, Name type = ${typeof name}`);
  
  try {
    const items = await prisma.item.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                name: name ? {
                  is: {
                    [lang]: name
                  }
                } : undefined
              },
              {
                category: categoryId ? {
                  is: {
                    id: categoryId
                  }
                } : undefined
              }
            ]
          },
          {
            size: {
              is: {
                values: {
                  some: {
                    colors: {
                      isEmpty: false
                    }
                  }
                }
              }
            }
          }
        ]
      }
    }) as ItemType[];
  
    if (!items) throw new Error('First fetch returned null');

    if (items.length < 1) {
      const response = await fetch(randomItemsUrl);
      const items = await response.json() as { length: number, items: ItemType[] };
      return res.json(items);
    }
    
    if (items.length < elmCount) {
      const presentIds = items.map(item => item.id);
      const additionalItems = await prisma.item.findMany({
        where: {
          NOT: {
            id: {
              in: presentIds
            }
          }
        }
      }) as ItemType[];

      const filteredItems = filterItemsByLang(items.concat(additionalItems), lang).map(item => {
        const {color, size} = getFirstAvailableColorAndSize(item, lang);
        
        return {
          ...item,
          size: {
            unit: item.size.unit,
            value: size
          },
          photos: undefined,
          photo: item.photos.find(photo => photo.color === color),
          category: undefined,
          description: undefined,
          minOrder: undefined
        }
      });

      return res.json({ length: filteredItems.length, items: filteredItems });
    }
    
    const filteredItems = filterItemsByLang(items, lang).map(item => {
      const {color, size} = getFirstAvailableColorAndSize(item, lang);
      
      return {
        ...item,
        size: {
          unit: item.size.unit,
          value: size
        },
        photos: undefined,
        photo: item.photos.find(photo => photo.color === color),
        category: undefined,
        description: undefined,
        minOrder: undefined
      }
    });
    
    return res.json({ length: filteredItems.length, items: filteredItems });
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}