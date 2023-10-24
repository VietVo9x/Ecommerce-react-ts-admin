import { I_UserLogin } from "../../types/Request";
import { LoginRepository } from "./LoginRepository";
const loginRepository = new LoginRepository();
export class LoginServices {
  async validator(dataForm: I_UserLogin) {
    const error = {
      isError: false,
      msgEmail: "",
      msgPassword: "",
    };
    //check mail
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!validRegex.test(dataForm.email)) {
      error.isError = true;
      error.msgEmail = "Email is not in the correct format";
    }

    //check password
    if (!dataForm.password) {
      error.isError = true;
      error.msgPassword = "Password cannot be empty";
    } else if (dataForm.password.length < 6) {
      error.isError = true;
      error.msgPassword = "Password must be at least 6 characters long";
    }
    //check email database
    const userAdmin = await loginRepository.getInfoUser();
    const user = userAdmin.find((element) => {
      if (element.email == dataForm.email) {
        if (element.password == dataForm.password) {
          return true;
        }
      }
    });
    if (!user) {
      error.isError = true;
      error.msgEmail = "Email or Password is incorrect.";
    }

    // return all error
    return error;
  }
}
