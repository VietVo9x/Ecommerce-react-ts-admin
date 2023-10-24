import { ProductEntities } from "./../../types/Entities";
import { I_productForm } from "../../types/Request";
import { ProductRepository } from "./ProductsRepository";

import { v4 as uuidv4 } from "uuid";
const productRepository = new ProductRepository();

export class ProductServices {
  createProduct(data: I_productForm) {
    const product: ProductEntities = {
      id: uuidv4(),
      sku: data.sku,
      category_name: data.category_name,
      product_name: data.product_name,
      description: data.description,
      unit_price: data.unit_price,
      stock_quantity: data.stock_quantity,
      image: data.image,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      new: data.new === "true" ? true : false,
      bestDeal: data.bestDeal === "true" ? true : false,
      bestSelling: data.bestSelling === "true" ? true : false,
    };

    return productRepository.CreateProduct(product);
  }
  validator(dataForm: I_productForm) {
    const error = {
      isError: false,
      msgSku: "",
      msgProduct_name: "",
      msgDescription: "",
      msgUnit_price: "",
      msgStock_quantity: "",
      msgImage: "",
    };

    if (!dataForm.product_name) {
      error.isError = true;
      error.msgProduct_name = "Product name must not be empty.";
    }
    if (!dataForm.sku) {
      error.isError = true;
      error.msgSku = "Sku must not be empty.";
    }
    if (!dataForm.category_name) {
      error.isError = true;
      error.msgSku = "Category must not be empty.";
    }
    if (!dataForm.description) {
      error.isError = true;
      error.msgDescription = "Description must not be empty.";
    }
    if (dataForm.unit_price == 0) {
      error.isError = true;
      error.msgUnit_price = "Price must not be empty.";
    }
    if (dataForm.stock_quantity == 0) {
      error.isError = true;
      error.msgStock_quantity = "Stock quantity must not be empty.";
    }

    if (!dataForm.image) {
      error.isError = true;
      error.msgImage = "Image quantity must not be empty.";
    }

    return error;
  }
  editProduct(data: I_productForm) {
    const product: ProductEntities = {
      id: data.id,
      sku: data.sku,
      category_name: data.category_name,
      product_name: data.product_name,
      description: data.description,
      unit_price: data.unit_price,
      stock_quantity: data.stock_quantity,
      image: data.image,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      new: data.new === "true" ? true : false,
      bestDeal: data.bestDeal === "true" ? true : false,
      bestSelling: data.bestSelling === "true" ? true : false,
    };
    console.log(product);
    return productRepository.UpdateProduct(product.id, product);
  }
}
