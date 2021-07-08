import { getCustomRepository } from "typeorm";
import { TrainerRepo } from "../repositories/trainerRepo";
import { IUpdateAvatar } from "../dtos";
import path from "path";
import fs from "fs";
import configUpload from "../../../shared/config/uploadAvatar";
import { IReturnTrainer } from "../dtos";
import { AppError } from "../../../shared/error";

class UpdateTrainerAvatarService {
  public async updateAvatarService({
    trainer_id,
    avatarFileName,
  }: IUpdateAvatar): Promise<IReturnTrainer> {
    const trainerRepo = getCustomRepository(TrainerRepo);

    const trainer = await trainerRepo.findByIdTrainer(trainer_id);

    if (!trainer) {
      throw new AppError("Trainer not exists", 400);
    }

    if (trainer.avatar) {
      const pathAvatarInTrainer = path.join(
        configUpload.directory,
        trainer.avatar
      );
      const existsFileAvatar = await fs.promises.stat(pathAvatarInTrainer);

      if (existsFileAvatar) {
        await fs.promises.unlink(pathAvatarInTrainer);
      }
    }

    trainer.avatar = avatarFileName;

    await trainerRepo.save(trainer);

    return trainer;
  }
}

export { UpdateTrainerAvatarService };
