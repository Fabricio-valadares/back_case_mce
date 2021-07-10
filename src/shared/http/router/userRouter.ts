import { Router } from "express";
import { CreateUserController } from "../../../modules/users/controller/createUserController";
import { SessionLoginUserController } from "../../../modules/accounts/controller/sessionLoginUserController";
import { UpdateAvatarUserController } from "../../../modules/users/controller/updateAvatarUserController";
import { UpdateUserController } from "../../../modules/users/controller/updateUserController";
import { tokenVerify } from "../middleware/verifyToken";
import configUpload from "../../config/uploadAvatar";
import multer from "multer";

const user = Router();
const createUserController = new CreateUserController();
const sessionLoginUserController = new SessionLoginUserController();
const updateAvatarUserController = new UpdateAvatarUserController();
const updateUserController = new UpdateUserController();

const upload = multer(configUpload);

user.post("/user/login", sessionLoginUserController.execute);
user.post("/user/register", createUserController.execute);

user.put("/user/update/:id", tokenVerify, updateUserController.execute);
user.patch(
  "/user/avatar",
  tokenVerify,
  upload.single("avatar"),
  updateAvatarUserController.execute
);

export { user };
