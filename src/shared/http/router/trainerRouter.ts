import { Router } from "express";
import { CreateTrainerController } from "../../../modules/trainer/controller/createTrainerController";
import { SessionLoginTrainerController } from "../../../modules/accounts/controller/sessionLoginTrainerController";
import { UpdateAvatarTrainerController } from "../../../modules/trainer/controller/updateAvatarTrainerController";
import { UpdateTrainerController } from "../../../modules/trainer/controller/updateTrainerController";
import { OneTrainerController } from "../../../modules/trainer/controller/oneTrainerController";
import { ForgotPasswordTrainerController } from "../../../modules/accounts/controller/forgotPasswordTrainerController";
import { ResetPasswordTrainerController } from "../../../modules/accounts/controller/resetPasswordTrainerController";
import { tokenVerify } from "../middleware/verifyToken";
import configUpload from "../../config/uploadAvatar";
import multer from "multer";

const trainer = Router();
const createTrainerController = new CreateTrainerController();
const sessionLoginTrainerController = new SessionLoginTrainerController();
const updateAvatarTrainerController = new UpdateAvatarTrainerController();
const updateTrainerController = new UpdateTrainerController();
const oneTrainerController = new OneTrainerController();

const resetPasswordTrainerController = new ResetPasswordTrainerController();
const forgotPasswordTrainerController = new ForgotPasswordTrainerController();

const upload = multer(configUpload);

trainer.post("/trainer/login", sessionLoginTrainerController.execute);
trainer.post("/trainer/register", createTrainerController.execute);

trainer.put(
  "/trainer/update/:id",
  tokenVerify,
  updateTrainerController.execute
);
trainer.post("/trainer/forgot", forgotPasswordTrainerController.execute);
trainer.post("/trainer/reset", resetPasswordTrainerController.execute);
trainer.get("/trainer/:id", tokenVerify, oneTrainerController.execute);
trainer.patch(
  "/trainer/avatar",
  tokenVerify,
  upload.single("avatar"),
  updateAvatarTrainerController.execute
);

export { trainer };
