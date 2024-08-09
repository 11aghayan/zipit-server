import { Request, Response } from "express";

import { serverError } from "../../errors";
import prisma from "../../prisma";
import { ItemType, LanguageType } from "../../types";
import filterItemsByLang from "../../utils/filterItemsByLang";
import getFirstAvailableColorAndSize from "../../utils/getFirstAvailableColorAndSize";

export default async function (req: Request, res: Response) {
  const lang  = req.params.lang as LanguageType;
  const elmCount = 20;
  
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
        id: true,
        promo: true
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
          photo: item.photos.find(photo => photo.color === color),
          category: undefined,
          description: undefined,
          minOrder: undefined
        }
      }); 

      return res.json({ length: filteredItems.length, items: filteredItems });
    }
    
    let filteredResponse = response.filter(item => item.promo);

    
    if (filteredResponse.length < elmCount) {
      filteredResponse = [...filteredResponse, ...response.filter(item => !(item.promo)).slice(0, elmCount - filteredResponse.length)];
    }
    
    const indexMap = new Map();
    
    while (indexMap.size < elmCount) {
      const index = Math.floor(Math.random() * filteredResponse.length);
      if (indexMap.has(index)) continue;

      indexMap.set(index, true);
    }
    
    const randomIds = Array.from(indexMap.keys()).map(index => response[index].id);
    
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