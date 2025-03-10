type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "admin" | "moderator";
    };
  }
}

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  slug: string;
  collections: [CollectionType];
  tags: [string];
  variants: [];
  stock: number;
  price: number;
  ratings: number;
  numOfRevies: number;
  expense: number;
  createdAt: Date;
  updatedAt: Date;
}

type OrderColumnType = {
  _id: string;
  customer: string;
  products: string[];
  totalAmount: number;
  createdAt: string;
  status: string;
  exchangeRate: number;
  currency: string;
}

type OrderItemType = {
  product: ProductType
  color: string;
  size: string;
  quantity: number;
}

type CustomerType = {
  _id: string;
  googleId?: string;
  image: string;
  ordersCount:number;
  name: string;
  email: string;
  orders: string[]
  createdAt: string;
}