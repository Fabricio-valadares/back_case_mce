import { getCustomRepository } from "typeorm";
import { AccountsUserForgotPasswordRepo } from "../repositories/accountsUserForgotPasswordRepo";
import { ConfigSendEmail } from "../../../shared/mail";
import { UserRepo } from "../../users/repositories/userRepo";
import { AppError } from "../../../shared/error";

class ForgotPasswordUserService {
  public async forgotPasswordUser(email: string): Promise<void> {
    const forgotUserRepo = getCustomRepository(AccountsUserForgotPasswordRepo);
    const userRepo = getCustomRepository(UserRepo);

    const user = await userRepo.findByEmailUser(email);

    if (!user) {
      throw new AppError("User not exist", 400);
    }

    const newTokenUser = await forgotUserRepo.generate(user.id);

    await ConfigSendEmail.sendEmail({
      to: "opa@mail.com",
      path: "",
      variable: {
        name: "Gustavo",
        link: `meu link aqui - token - ${newTokenUser.token}`,
      },
    });
  }
}

export { ForgotPasswordUserService };
