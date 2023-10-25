import { NextFunction, Request, Response } from "express";
import sharp from "sharp";

import { PhotoType } from "../types";
import customError from "../errors/customError";

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const { photos } = req.body;
  
    const newPhotos = photos.map(async (photo: PhotoType) => {
      const type = photo.src.split('/')[1].split(';')[0];
      if (type === 'webp') return photo;
      const base64 = Buffer.from(photo.src.split(',')[1], 'base64');
      console.log('Original ' + Buffer.byteLength(base64) / 1024 /1024  + ' Mb');
      const sharpPhoto = await sharp(base64).webp({ quality: 60 }).resize(500, 500).toBuffer();
      console.log('Sharp ' + Buffer.byteLength(sharpPhoto) / 1024 + ' Kb');
      return {
        ...photo,
        src: `data:image/webp;base64,${sharpPhoto.toString('base64')}`
      };
      
    });
  
    Promise.all(newPhotos)
      .then(data => {
        req.body.photos = data;
        next();
      });
  } catch (error) {
    console.log(error);
    return customError(res, 400, 'Sharp error. Wrong image data');
  }
}