import { UserEntities } from "../../types/Entities";
import { I_UserRegister } from "../../types/Request";
import { USerRepository } from "./USerRepository";
import { v4 as uuid4 } from "uuid";
import md5 from "md5";
const userRepository = new USerRepository();
export class UserServices {
  register(dataForm: I_UserRegister) {
    const entity_user: UserEntities = {
      id: uuid4(),
      email: dataForm.email,
      password: md5(dataForm.password),
      userName: dataForm.userName,
      fullName: dataForm.fullName,
      phone: dataForm.phone,
      address: dataForm.address,
      role: false,
      status: true,
      cart: [],
      created_at: new Date().toLocaleDateString(),
      update_at: new Date().toLocaleDateString(),
    };
    const getData = userRepository.createUser(entity_user);
    return getData;
  }
  async updateUser(id: string, data: UserEntities) {
    const users = await userRepository.getAllUsers();
    const user = users.find((user: UserEntities) => user.id === data.id);
    user.status = !user.status;
    const newUser = { ...user };
    return userRepository.editUser(newUser.id, newUser);
  }
  async validator(dataForm: I_UserRegister) {
    const error = {
      isError: false,
      msgEmail: "",
      msgPhone: "",
      msgUserName: "",
      msgFullName: "",
      msgAddress: "",
      msgPassword: "",
      msgPasswordConfirm: "",
    };

    //check mail
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!validRegex.test(dataForm.email)) {
      error.isError = true;
      error.msgEmail = "Email is not in the correct format";
    }

    //check  phone
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!dataForm.phone) {
      error.isError = true;
      error.msgPhone = "Phone number cannot be empty";
    } else if (!dataForm.phone.match(regexPhoneNumber)) {
      error.isError = true;
      error.msgPhone = "Phone does not match the VN phone format";
    }

    //check user name
    const regex = /^[a-zA-Z]*$/;
    if (!dataForm.userName) {
      error.isError = true;
      error.msgUserName = "User Name cannot be empty";
    } else if (dataForm.userName.length < 6) {
      error.isError = true;
      error.msgUserName = "User Name must be at least 6 characters";
    } else if (!regex.test(dataForm.userName)) {
      error.isError = true;
      error.msgUserName = "Username cannot contain special characters";
    }

    //check fullName
    if (!dataForm.fullName) {
      error.isError = true;
      error.msgFullName = "Full Name cannot be empty";
    }

    //check address
    if (!dataForm.address) {
      error.isError = true;
      error.msgAddress = "Address cannot be empty";
    }

    //check password
    if (!dataForm.password) {
      error.isError = true;
      error.msgPassword = "Password cannot be empty";
    } else if (dataForm.password.length < 6) {
      error.isError = true;
      error.msgPassword = "Password must be at least 6 characters long";
    }

    //check trung lap email
    const users = await userRepository.getAllUsers();
    const isCheck = users.find(
      (user: I_UserRegister) => user.email === dataForm.email
    );
    if (isCheck) {
      error.isError = true;
      error.msgEmail = "Your email already exists.";
    }
    //return all errors

    return error;
  }
}
