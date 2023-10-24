import { CategoryEntities } from "./../../types/Entities";
import { I_categoryForm } from "../../types/Request";
import { createData, deleteData, getData, updateData } from "../../utils/Db";

export class CategoryRepository {
  getCategoryDB() {
    const categorys = getData("categorys");
    return categorys;
  }
  createCategoryDB(data: CategoryEntities) {
    const category = createData("categorys", data);
    return category;
  }
  updateCategoryDB(id: string, data: I_categoryForm) {
    const response = updateData("categorys", id, data);
    return response;
  }
  deleteCategoryDB(id: any) {
    const response = deleteData("categorys", id);
    return response;
  }
}
