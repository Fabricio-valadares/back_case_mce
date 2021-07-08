import { EntityRepository, Repository } from "typeorm";
import { TrainerEntitie } from "../typeorm/entities/trainerEntities";
import { IDataTrainer } from "../dtos";

@EntityRepository(TrainerEntitie)
class TrainerRepo extends Repository<TrainerEntitie> {
  public async createTrainer({
    name,
    email,
    password_hash,
    isTrainer = true,
  }: IDataTrainer): Promise<TrainerEntitie> {
    const newTrainer = this.create({
      name,
      email,
      password_hash,
      isTrainer,
    });

    await this.save(newTrainer);

    return newTrainer;
  }

  public async findByIdTrainer(
    id: string
  ): Promise<TrainerEntitie | undefined> {
    const trainer = await this.findOne(id);

    return trainer;
  }

  public async findByEmailTrainer(
    email: string
  ): Promise<TrainerEntitie | undefined> {
    const trainer = await this.findOne({ email });

    return trainer;
  }
}

export { TrainerRepo };
