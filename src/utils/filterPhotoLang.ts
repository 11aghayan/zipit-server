import { LanguageType, PhotoType } from "../types";

export default function (photos: PhotoType[], lang: LanguageType) {
  return photos.map(photo => ({
    ...photo,
    color: photo.color[lang]
  }));
}