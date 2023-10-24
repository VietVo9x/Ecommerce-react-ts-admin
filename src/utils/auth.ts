import { UserEntities } from "../types/Entities";
import { getData } from "./Db";

export const auth = async () => {
  const adminLocal = localStorage.getItem("adminLogin");
  if (adminLocal) {
    const admin = JSON.parse(adminLocal);
    return getData("user_admin");
    // if (adminDB.email == admin.email) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
};
