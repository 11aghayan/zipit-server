import { NextFunction, Request, Response } from "express";

import { customError, serverError } from "../errors";
import objLength from "../utils/objLength";
import { ItemBodyType } from "../types";
import photoErrors from "../utils/photoErrors";

export default function (req: Request, res: Response, next: NextFunction) {
  const { 
    category, 
    name, 
    price, 
    promo,
    size,
    minOrder,
    photos
  } = req.body as ItemBodyType;
  
  const sizeUnits = ['mm', 'cm', 'm'];
  const minOrderUnits = ['pcs', 'cm', 'box', 'roll'];
  
  if (!category) return customError(res, 400, 'Category not provided');
  if (!name || !objLength(name)) return customError(res, 400, 'Name not provided');
  if (!name?.am) return customError(res, 400, 'Armenian name not provided');
  if (!name?.ru) return customError(res, 400, 'Russian name not provided');
  if (!price) return customError(res, 400, 'Price not provided'); 
  if (price < 0) return customError(res, 400, 'Price must be greater or equal to 0');
  if (typeof promo === 'number' && promo >= price) return customError(res, 400, 'Promo must be less than price');

  if (!size || !objLength(size)) return customError(res, 400, 'Size not provided');
  if (size?.values.length < 1) return customError(res, 400, 'Size values cannot be empty');

  const sizeNegativeError = size?.values.reduce((acc, val) => val.value < 0 ? true : acc, false);

  if (sizeNegativeError) return customError(res, 400, 'Size cannot be a negative number');

  const sameSizeError = size?.values.reduce((acc, { value }) => {
    const key = value.toString();
    if (key in acc) {
      const newObj = { error: true };
      return newObj;
    }
    const newObj = {...acc, [key]: true};
    return newObj;
  }, { error: false }).error;

  if (sameSizeError) return customError(res, 400, 'Cannot be 2 same values for sizes');
  if (sizeNegativeError === undefined || sameSizeError === undefined) return serverError(res);
  if (!size?.unit) return customError(res, 400, 'Size unit not provided');
  if (!sizeUnits.includes(size.unit)) return customError(res, 400, 'Wrong size unit provided');

  if (!minOrder || !objLength(minOrder)) return customError(res, 400, 'Min order not provided');
  if (minOrder?.qty < 1) return customError(res, 400, 'Min order qty must be 1 or greater');
  if (!minOrder?.unit) return customError(res, 400, 'Min order unit not provided');
  if (!minOrderUnits.includes(minOrder?.unit)) return customError(res, 400, 'Wrong min order unit provided');
  if (!photos || !photos?.length) return customError(res, 400, 'Photos not provided');

  const photoError = photoErrors(photos);
  
  if (photoError) return customError(res, 400, photoError);

  next();
}