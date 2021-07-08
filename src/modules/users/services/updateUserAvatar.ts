import { getCustomRepository } from "typeorm";
import { UserRepo } from "../repositories/userRepo";
import { IUpdateAvatar } from "../dtos";
import path from "path";
import fs from "fs";
import configUpload from "../../../shared/config/uploadAvatar";
import { IReturnUser } from "../dtos";
import { AppError } from "../../../shared/error";

class UpdateUserAvatarService {
  public async updateAvatarService({
    user_id,
    avatarFileName,
  }: IUpdateAvatar): Promise<IReturnUser> {
    const userRepo = getCustomRepository(UserRepo);

    const user = await userRepo.findByIdUser(user_id);

    if (!user) {
      throw new AppError("User not exists", 400);
    }

    if (user.avatar) {
      const pathAvatarInUser = path.join(configUpload.directory, user.avatar);
      const existsFileAvatar = await fs.promises.stat(pathAvatarInUser);

      if (existsFileAvatar) {
        await fs.promises.unlink(pathAvatarInUser);
      }
    }

    user.avatar = avatarFileName;

    await userRepo.save(user);

    return user;
  }
}

export { UpdateUserAvatarService };
