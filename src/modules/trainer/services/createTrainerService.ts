import { getCustomRepository } from "typeorm";
import { TrainerRepo } from "../repositories/trainerRepo";
import { IDataTrainerService, IReturnTrainer } from "../dtos";
import { AppError } from "../../../shared/error";
import { hash } from "bcryptjs";

class CreateTrainerServices {
  public async createService({
    name,
    email,
    password,
  }: IDataTrainerService): Promise<IReturnTrainer> {
    const repoTrainer = getCustomRepository(TrainerRepo);

    const trainer = await repoTrainer.findByEmailTrainer(email);

    if (trainer) {
      throw new AppError("Email already exists", 400);
    }

    const hashPassword = await hash(password, 8);

    const newTrainer = await repoTrainer.createTrainer({
      name,
      email,
      password_hash: hashPassword,
    });

    return {
      id: newTrainer.id,
      name: newTrainer.name,
      email: newTrainer.email,
    };
  }
}

export { CreateTrainerServices };
