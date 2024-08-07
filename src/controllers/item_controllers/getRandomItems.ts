import { Request, Response } from "express";

import { serverError } from "../../errors";
import prisma from "../../prisma";
import { ItemType, LanguageType } from "../../types";
import filterItemsByLang from "../../utils/filterItemsByLang";
import getFirstAvailableColorAndSize from "../../utils/getFirstAvailableColorAndSize";

export default async function (req: Request, res: Response) {
  const lang  = req.params.lang as LanguageType;
  const elmCount = 10;
  
  try {

    const response = await prisma.item.findMany({
      where: {
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
      },
      select: {
        id: true
      }
    });

    if (response.length < 1 || !response) return res.json({ length: 0, items: [] });

    if (response.length <= elmCount) {
      const items = await prisma.item.findMany({
        where: {
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
        },
        select: {
          id: true,
          name: true,
          photos: true,
          size: true,
          price: true,
          promo: true
        }
      }) as ItemType[];
      
      const filteredItems = filterItemsByLang(items, lang).map(item => {
        const {color, size} = getFirstAvailableColorAndSize(item, lang);
        
        return {
          ...item,
          size: {
            unit: item.size.unit,
            value: size
          },
          photos: undefined,
          photo: item.photos.find(photo => photo.color === color)
        }
      }); 

      return res.json({ length: filteredItems.length, items: filteredItems });
    }
    
    const indexMap = new Map();
    
    while (indexMap.size < elmCount) {
      const index = Math.floor(Math.random() * elmCount);
      if (indexMap.has(index)) continue;

      indexMap.set(index, true);
    }
    
    const randomIds = Array.from(indexMap.keys()).reduce((prev: string[], index) => {
      return [
        ...prev,
        response[index].id
      ];
    }, []);
    
    const items = await prisma.item.findMany({
      where: {
        AND: [
          {
            id: {
              in: randomIds
            }
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
      },
      select: {
        id: true,
        name: true,
        photos: true,
        size: true,
        price: true,
        promo: true
      }
    }) as ItemType[];
    
    const filteredItems = filterItemsByLang(items, lang).map(item => {
      const {color, size} = getFirstAvailableColorAndSize(item, lang);

      
      return {
        ...item,
        size: {
          unit: item.size.unit,
          value: size
        },
        photos: undefined,
        photo: item.photos.find(photo => photo.color === color)
      }
    });


    
    return res.json({ length: filteredItems.length, items: filteredItems });
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}