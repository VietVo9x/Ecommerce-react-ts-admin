import { products } from "./../../models/index";
import { ProductEntities } from "../../types/Entities";
import { I_ProductServices } from "../../types/Request";
import { createData, deleteData, getData, updateData } from "../../utils/Db";

export class ProductRepository {
  getAllProducts() {
    const products = getData("products");
    return products;
  }
  CreateProduct(data: ProductEntities) {
    const response = createData("products", data);
    return response;
  }
  UpdateProduct(id: string, data: ProductEntities) {
    const response = updateData("products", id, data);
    return response;
  }
  deleteProduct(id: string) {
    const response = deleteData("products", id);
    return response;
  }
}
