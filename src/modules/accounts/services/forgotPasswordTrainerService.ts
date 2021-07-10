import { getCustomRepository } from "typeorm";
import { AccountsTrainerForgotPasswordRepo } from "../repositories/accountsTrainerForgotPasswordRepo";
import { ConfigSendEmail } from "../../../shared/mail";
import { TrainerRepo } from "../../trainer/repositories/trainerRepo";
import { AppError } from "../../../shared/error";
import { resolve } from "path";
import getenv from "getenv";

class ForgotPasswordTrainerService {
  public async forgotPasswordTrainer(email: string): Promise<void> {
    const forgotTrainerRepo = getCustomRepository(
      AccountsTrainerForgotPasswordRepo
    );
    const trainerRepo = getCustomRepository(TrainerRepo);

    const trainer = await trainerRepo.findByEmailTrainer(email);

    if (!trainer) {
      throw new AppError("Trainer not exist", 400);
    }

    const newTokenTrainer = await forgotTrainerRepo.generate(trainer.id);

    const pathTemplate = resolve(
      __dirname,
      "..",
      "..",
      "..",
      "shared",
      "mail",
      "templateEmailTrainer.hbs"
    );

    const dataVariable = {
      name: trainer.name,
      link: `${getenv("LINK_PAGE_RESET_PASSWORD")}${newTokenTrainer.token}`,
    };

    await ConfigSendEmail.sendEmail({
      to: "opa@mail.com",
      path: pathTemplate,
      variable: dataVariable,
    });
  }
}

export { ForgotPasswordTrainerService };
