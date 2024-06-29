import { NextFunction, Request, Response } from "express";
import sharp from "sharp";

import { PhotoType } from "../types";
import { customError } from "../errors";

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const { photos } = req.body;
  
    const newPhotos = photos.map(async (photo: PhotoType) => {
      try {
        const type = photo.src.split('/')[1].split(';')[0];
        if (type === 'webp') return photo;
        const base64 = Buffer.from(photo.src.split(',')[1], 'base64');
        const sharpPhoto = await sharp(base64).webp({ quality: 60 }).resize(500, 500).toBuffer();
        return {
          ...photo,
          src: `data:image/webp;base64,${sharpPhoto.toString('base64')}`
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    });

    if (!newPhotos) {
      return new Error('Error');
    }
    Promise.all(newPhotos)
      .then(data => {
        req.body.photos = data;
        if (!data[0]) {
          return customError(res, 400, 'Sharp error. Wrong image data');
        }
        next();
      });
  } catch (error) {
    console.error(error);
    return customError(res, 400, 'Sharp error. Wrong image data');
  }
}