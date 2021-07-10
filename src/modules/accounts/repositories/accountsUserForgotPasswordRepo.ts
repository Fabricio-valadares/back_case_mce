import { EntityRepository, Repository } from "typeorm";
import { EntitieUserForgotPassword } from "../typeorm/entities/entitieUserForgotPassword";

@EntityRepository(EntitieUserForgotPassword)
class AccountsUserForgotPasswordRepo extends Repository<EntitieUserForgotPassword> {
  public async findByToken(
    token: string
  ): Promise<EntitieUserForgotPassword | undefined> {
    const tokenInUser = await this.findOne({ where: { token } });

    return tokenInUser;
  }

  public async generate(user_id: string): Promise<EntitieUserForgotPassword> {
    const userTokenForgot = this.create({ user_id });

    await this.save(userTokenForgot);

    return userTokenForgot;
  }
}

export { AccountsUserForgotPasswordRepo };
