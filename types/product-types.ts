interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isBestSeller: boolean;
}

export type { Product };
