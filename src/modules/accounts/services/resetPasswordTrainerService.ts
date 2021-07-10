import { getCustomRepository } from "typeorm";
import { AccountsTrainerForgotPasswordRepo } from "../repositories/accountsTrainerForgotPasswordRepo";
import { TrainerRepo } from "../../trainer/repositories/trainerRepo";
import { IDataResetPassword } from "../dtos";
import { AppError } from "../../../shared/error";
import { hash } from "bcryptjs";
import { isAfter, addHours } from "date-fns";

class ResetPasswordTrainerServices {
  public async resetPassword({
    token,
    password,
  }: IDataResetPassword): Promise<void> {
    const trainerRepo = getCustomRepository(TrainerRepo);
    const forgotTrainerRepo = getCustomRepository(
      AccountsTrainerForgotPasswordRepo
    );

    const trainer = await forgotTrainerRepo.findByToken(token);

    if (!trainer) {
      throw new AppError("Trainer Token not exists", 400);
    }

    const dataTrainerFinal = await trainerRepo.findByIdTrainer(
      trainer.trainer_id
    );

    if (!dataTrainerFinal) {
      throw new AppError("Trainer not exists", 400);
    }

    const addHoursFinal = addHours(trainer.created_at, 2);

    if (isAfter(Date.now(), addHoursFinal)) {
      throw new AppError("Token expires", 400);
    }

    dataTrainerFinal.password_hash = await hash(password, 8);

    await trainerRepo.save(dataTrainerFinal);
  }
}

export { ResetPasswordTrainerServices };
