import { UserAdminEntities } from "../../types/Entities";
import { I_UserLogin } from "../../types/Request";
import { createData, getData } from "../../utils/Db";

export class LoginRepository {
  async getInfoUser() {
    const inForUser = await getData("user_admin");
    return inForUser as UserAdminEntities[];
  }
}
