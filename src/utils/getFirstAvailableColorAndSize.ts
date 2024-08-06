import { LanguageType } from "../types";

type ItemType = {
  size: {
    values: { 
      colors: string[] ,
      value: number;
    }[]
  }
}

export default function getFirstAvailableColorAndSize(item: ItemType, lang: LanguageType) {
  const size = item.size.values.find(val => val.colors.length > 0)!;

  const color = size.colors[0].split('&dash&')[lang === 'am' ? 0 : 1];
  
  return {color, size: size.value};
}