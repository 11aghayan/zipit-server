
export type LanguageStringType = {
  am: string;
  ru: string;
}

export type LanguageType = 'am' | 'ru'; 

export type CategoryType = {
  id: string;
  label: LanguageStringType;
  itemsQty: number
}

export type PromoType = number | null;

export type SizeUnitType = 'mm' | 'cm' | 'm';

export type SizeType = {
  val: number;
  unit: SizeUnitType;
}

export type MinOrderUnitType = 'pcs' | 'cm' | 'box' | 'roll';

export type MinOrderType = {
  qty: number;
  unit: MinOrderUnitType
}

export type PhotoType = {
  src: string;
  qty: number;
  color: LanguageStringType;
};

export type ItemBodyType = {
  category: string;
  name: LanguageStringType;
  price: number;
  promo: PromoType;
  size: SizeType;
  minOrder: MinOrderType;
  photos: PhotoType[];
  description: LanguageStringType;
}