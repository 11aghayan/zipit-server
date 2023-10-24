import { PhotoType } from "../types";

export default function (photos: PhotoType[]) {
  const errors = {
    amColorError: '',
    ruColorError: '',
    qtyMissingError: '',
    qtyValueError: '',
    srcError: ''
  };

  let errorMessage: string = '';

  photos.forEach(photo => {
    if (!photo.src) errors.srcError = 'Photo src not provided';
    if (!photo.color.am) errors.amColorError = 'Color ARM not provided';
    if (!photo.color.ru) errors.ruColorError = 'Color RUS not provided';
    if (photo.qty < 0) errors.qtyValueError = 'Quantity must be number greater or equal to 0';
    if (!photo.qty && photo.qty !== 0) errors.qtyMissingError = 'Quantity not provided';
  });

  if (errors.srcError) errorMessage += errors.srcError;
  if (errors.amColorError) {
    errorMessage += errorMessage ? (', ' + errors.amColorError) : errors.amColorError;
  }
  if (errors.ruColorError) {
    errorMessage += errorMessage ? (', ' + errors.ruColorError) : errors.ruColorError;
  }
  if (errors.qtyMissingError) {
    errorMessage += errorMessage ? (', ' + errors.qtyMissingError) : errors.qtyMissingError;
  }
  if (errors.qtyValueError) {
    errorMessage += errorMessage ? (', ' + errors.qtyValueError) : errors.qtyValueError;
  }

  return errorMessage || null;
}