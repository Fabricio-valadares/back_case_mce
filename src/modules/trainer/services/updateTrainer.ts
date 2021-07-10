import { getCustomRepository } from "typeorm";
import { TrainerRepo } from "../repositories/trainerRepo";
import { IUpadateTrainer, IReturnUpadateTrainer } from "../dtos";
import { AppError } from "../../../shared/error";
import { hash } from "bcryptjs";

class UpdateTrainerServices {
  public async updateTrainer({
    id,
    name,
    email,
    telefone,
    password,
  }: IUpadateTrainer): Promise<IReturnUpadateTrainer> {
    const trainerRepo = getCustomRepository(TrainerRepo);

    const trainer = await trainerRepo.findByIdTrainer(id);

    if (!trainer) {
      throw new AppError("Trainer not exists", 400);
    }

    const currentPassword =
      password !== undefined ? password : trainer.password_hash;

    const passwordHash = await hash(currentPassword, 8);

    trainer.name = name !== undefined ? name : trainer.name;
    trainer.email = email !== undefined ? email : trainer.email;
    trainer.telefone = telefone !== undefined ? telefone : trainer.telefone;
    trainer.password_hash =
      password !== undefined ? passwordHash : trainer.password_hash;

    await trainerRepo.save(trainer);

    return {
      id: trainer.id,
      name: trainer.name,
      telefone: trainer.telefone,
      email: trainer.email,
    };
  }
}

export { UpdateTrainerServices };
