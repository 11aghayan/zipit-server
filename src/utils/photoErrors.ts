import { PhotoType } from "../types";

export default function (photos: PhotoType[]) {
  const errors = {
    colorError: '',
    qtyMissingError: '',
    qtyValueError: '',
    srcError: ''
  };

  let errorMessage: string = '';

  photos.forEach(photo => {
    if (!photo.src) errors.srcError = 'Photo src not provided';
    if (!photo.color) errors.colorError = 'Color not provided';
    if (photo.qty < 0) errors.qtyValueError = 'Quantity must be number greater or equal to 0';
    if (!photo.qty && photo.qty !== 0) errors.qtyMissingError = 'Quantity not provided';
  });

  if (errors.srcError) errorMessage += errors.srcError;
  if (errors.colorError) {
    errorMessage += errorMessage ? (', ' + errors.colorError) : errors.colorError;
  }
  if (errors.qtyMissingError) {
    errorMessage += errorMessage ? (', ' + errors.qtyMissingError) : errors.qtyMissingError;
  }
  if (errors.qtyValueError) {
    errorMessage += errorMessage ? (', ' + errors.qtyValueError) : errors.qtyValueError;
  }

  return errorMessage || null;
}