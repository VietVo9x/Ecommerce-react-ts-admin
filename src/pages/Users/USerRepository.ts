import { UserEntities } from "../../types/Entities";
import { createData, getData, updateData } from "../../utils/Db";

export class USerRepository {
  async getAllUsers() {
    const users = await getData("users");
    return users;
  }
  async createUser(data: UserEntities) {
    const response = await createData("users", data);
    return response;
  }
  async editUser(id: string, data: UserEntities) {
    const response = await updateData("users", id, data);
    return response;
  }
}
