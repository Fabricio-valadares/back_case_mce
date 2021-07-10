import { getCustomRepository } from "typeorm";
import { TrainerRepo } from "../repositories/trainerRepo";
import { IReturnOnerTrainer } from "../dtos";
import { AppError } from "../../../shared/error";

class OneTrainerServices {
  public async oneTrainer(id: string): Promise<IReturnOnerTrainer> {
    const trainerRepo = getCustomRepository(TrainerRepo);

    const trainer = await trainerRepo.findByIdTrainer(id);

    if (!trainer) {
      throw new AppError("Trainer not exists", 400);
    }

    return {
      id: trainer.id,
      name: trainer.name,
      email: trainer.email,
      telefone: trainer.telefone,
    };
  }
}

export { OneTrainerServices };
