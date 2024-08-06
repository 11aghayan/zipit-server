import { ItemType, LanguageType } from "../types";
import filterPhotoLang from "./filterPhotoLang";

export default function filterItemsByLang(items: ItemType[], lang: LanguageType) {
  return items.map(item => ({
    ...item,
    category: {
      id: item.category.id,
      name: item.category.name[lang]
    },
    description: item.description[lang],
    name: item.name[lang],
    photos: filterPhotoLang(item.photos, lang),
  }))
}