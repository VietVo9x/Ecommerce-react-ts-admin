export interface I_UserLogin {
  email: string;
  password: string;
}
export interface I_UserRegister {
  userName: string;
  email: string;
  fullName: string;
  password: string;
  phone: string;
  address: string;
}
export interface I_RegisterError {
  isError: boolean;
  msgEmail: string;
  msgPhone: string;
  msgUserName: string;
  msgFullName: string;
  msgAddress: string;
  msgPassword: string;
  msgPasswordConfirm: string;
}
export interface I_product {
  sku: string;
  category_name: string;
  product_name: string;
  description: string;
  unit_price: number;
  stock_quantity: number;
  image: string;
  created_at: string;
  updated_at: string;
  id?: string;
  new?: boolean;
  bestDeal?: boolean;
  bestSelling?: boolean;
}
export interface I_productForm {
  id: string;
  sku: string;
  product_name: string;
  description: string;
  unit_price: number;
  stock_quantity: number;
  image: string;
  category_name: string;
  new?: string;
  bestDeal?: string;
  bestSelling?: string;
}
export interface I_ProductServices {
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
export interface I_ProductFormError {
  isError: boolean;
  msgSku: string;
  msgProduct_name: string;
  msgDescription: string;
  msgUnit_price: string;
  msgStock_quantity: string;
  msgImage: string;
}
export interface I_RegisterError {
  isError: boolean;
  msgEmail: string;
  msgPhone: string;
  msgUserName: string;
  msgFullName: string;
  msgAddress: string;
  msgPassword: string;
}
export interface I_categoryForm {
  category_name: string;
  description: string;
  status: boolean;
  category_id: string;
  products: I_productForm[];
}
export interface I_categoryFormError {
  isError: boolean;
  msgName: string;
  msgDesc: string;
  msgStatus: string;
}
