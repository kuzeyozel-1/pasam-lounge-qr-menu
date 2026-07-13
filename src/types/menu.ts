export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Product {
  id: string;
  categoryId: string;
  subCategory?: string;
  order?: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  visible: boolean;
  priceUnverified?: boolean;
}
