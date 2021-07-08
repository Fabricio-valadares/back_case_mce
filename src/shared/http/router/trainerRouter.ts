import { Router } from "express";
import { CreateTrainerController } from "../../../modules/trainer/controller/createTrainerController";
import { SessionLoginTrainerController } from "../../../modules/accounts/controller/sessionLoginTrainerController";
import { UpdateAvatarTrainerController } from "../../../modules/trainer/controller/updateAvatarTrainerController";
import { tokenVerify } from "../middleware/verifyToken";
import configUpload from "../../config/uploadAvatar";
import multer from "multer";

const trainer = Router();
const createTrainerController = new CreateTrainerController();
const sessionLoginTrainerController = new SessionLoginTrainerController();
const updateAvatarTrainerController = new UpdateAvatarTrainerController();

const upload = multer(configUpload);

trainer.post("/trainer/login", sessionLoginTrainerController.execute);
trainer.patch(
  "/trainer/avatar",
  tokenVerify,
  upload.single("avatar"),
  updateAvatarTrainerController.execute
);

trainer.post("/trainer/register", createTrainerController.execute);

export { trainer };
