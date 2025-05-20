import config from "../../config";
import { User } from "./user.model";

const user = {
  email: "rafizulislam899@gmail.com",
  password: config.ADMIN_PASSWORD,
  role: "admin",
};

const createAdmin = async () => {
  const isAdminExists = await User.findOne({ role: "admin" });

  if (!isAdminExists) {
    await User.create(user);
  }
};

export default createAdmin;
