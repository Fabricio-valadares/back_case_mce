import { getCustomRepository } from "typeorm";
import { TrainerRepo } from "../repositories/trainerRepo";
import { IReturnUpadateTrainer } from "../dtos";
import { AppError } from "../../../shared/error";

class OnerTrainerServices {
  public async oneTrainer(id: string): Promise<IReturnUpadateTrainer> {
    const trainerRepo = getCustomRepository(TrainerRepo);

    const user = await trainerRepo.findByIdTrainer(id);

    if (!user) {
      throw new AppError("Trainer not exists", 400);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      telefone: user.telefone,
    };
  }
}

export { OnerTrainerServices };
