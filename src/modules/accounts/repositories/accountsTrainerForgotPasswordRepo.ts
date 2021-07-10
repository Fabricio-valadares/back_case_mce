import { EntityRepository, Repository } from "typeorm";
import { EntitieTrainerForgotPassword } from "../typeorm/entities/entitieTrainerForgotPassword";

@EntityRepository(EntitieTrainerForgotPassword)
class AccountsTrainerForgotPasswordRepo extends Repository<EntitieTrainerForgotPassword> {
  public async findByToken(
    token: string
  ): Promise<EntitieTrainerForgotPassword | undefined> {
    const tokenInTrainer = await this.findOne({ where: { token } });

    return tokenInTrainer;
  }

  public async generate(
    trainer_id: string
  ): Promise<EntitieTrainerForgotPassword> {
    const trainerTokenForgot = this.create({ trainer_id });

    await this.save(trainerTokenForgot);

    return trainerTokenForgot;
  }
}

export { AccountsTrainerForgotPasswordRepo };
