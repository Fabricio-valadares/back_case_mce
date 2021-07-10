import { getCustomRepository } from "typeorm";
import { AccountsUserForgotPasswordRepo } from "../repositories/accountsUserForgotPasswordRepo";
import { ConfigSendEmail } from "../../../shared/mail";
import { UserRepo } from "../../users/repositories/userRepo";
import { AppError } from "../../../shared/error";
import { resolve } from "path";
import getenv from "getenv";
class ForgotPasswordUserService {
  public async forgotPasswordUser(email: string): Promise<void> {
    const forgotUserRepo = getCustomRepository(AccountsUserForgotPasswordRepo);
    const userRepo = getCustomRepository(UserRepo);

    const user = await userRepo.findByEmailUser(email);

    if (!user) {
      throw new AppError("User not exist", 400);
    }

    const newTokenUser = await forgotUserRepo.generate(user.id);

    const pathTemplate = resolve(
      __dirname,
      "..",
      "..",
      "..",
      "shared",
      "mail",
      "templateEmailUser.hbs"
    );

    const dataVariable = {
      name: user.name,
      link: `${getenv("LINK_PAGE_RESET_PASSWORD")}${newTokenUser.token}`,
    };

    await ConfigSendEmail.sendEmail({
      to: "opa@mail.com",
      path: pathTemplate,
      variable: dataVariable,
    });
  }
}

export { ForgotPasswordUserService };
