import { LanguageType, PhotoType } from "../types";

type ItemType = {
  size: {
    values: { 
      colors: string[] ,
      value: number;
    }[]
  },
  photos: {
    color: string;
    src: string;
  }[];
}

export default function getFirstAvailableColorAndSize(item: ItemType, lang: LanguageType) {
  const size = item.size.values.find(val => val.colors.length > 0);

  const color = size?.colors[0]?.split('&dash&')[lang === 'am' ? 0 : 1] || item.photos[0].color;
  
  return {color, size: size?.value || null};
}