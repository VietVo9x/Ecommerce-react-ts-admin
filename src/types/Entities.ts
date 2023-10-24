import { category } from "./../models/index";
export interface UserAdminEntities {
  userName: string;
  email: string;
  password: string;
}
export interface ProductEntities {
  sku: string;
  category_name: string;
  product_name: string;
  description: string;
  unit_price: number;
  stock_quantity: number;
  image: string;
  created_at: string;
  updated_at: string;
  id: string;
  new?: boolean;
  bestDeal?: boolean;
  bestSelling?: boolean;
}
export interface UserEntities {
  id: string;
  email: string;
  password: string;
  userName: string;
  fullName: string;
  phone: string;
  address: string;
  role: boolean;
  status: boolean;
  cart: ProductToCartEntities[];
  created_at: string;
  update_at: string;
}
export interface ProductToCartEntities {
  sku: string;
  category_name: string;
  product_name: string;
  description: string;
  unit_price: number;
  quantity: number;
  image: string;
  created_at: string;
  updated_at: string;
  id: string;
  new?: boolean;
  bestDeal?: boolean;
  bestSelling?: boolean;
}
export interface CategoryEntities {
  id: string;
  category_name: string;
  description: string;
  status: boolean;
  products: ProductEntities[];
}
