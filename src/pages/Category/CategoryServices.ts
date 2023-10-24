import { CategoryEntities } from "./../../types/Entities";
import { I_categoryForm } from "../../types/Request";
import { CategoryRepository } from "./CategoryRepository";
import { v4 as uuidv4 } from "uuid";
const categoryRepository = new CategoryRepository();
export class CategoryServices {
  async createCategory(data: I_categoryForm) {
    const category: CategoryEntities = {
      id: uuidv4(),
      category_name: data.category_name,
      description: data.description,
      status: data.status,
      products: [],
    };

    const response = await categoryRepository.createCategoryDB(category);
    console.log(response);
    return response;
  }
  updateCategory(id: string, data: I_categoryForm) {
    return categoryRepository.updateCategoryDB(id, data);
  }
  async deleteCategory(id: string) {
    const response = await categoryRepository.deleteCategoryDB(id);
    return response;
  }
  async validator(data: I_categoryForm) {
    const error = {
      isError: false,
      msgName: "",
      msgDesc: "",
      msgStatus: "",
    };
    if (!data.category_name) {
      error.isError = true;
      error.msgName = "Category name is not empty";
    }
    if (!data.description) {
      error.isError = true;
      error.msgDesc = "Description is not empty";
    }
    //kiem tra name co trung khong
    const categorys = await categoryRepository.getCategoryDB();
    const category = categorys.find(
      (element: CategoryEntities) => element.category_name == data.category_name
    );
    if (category) {
      error.isError = true;
      error.msgName = "Category name is correct";
    }
    return error;
  }
}
