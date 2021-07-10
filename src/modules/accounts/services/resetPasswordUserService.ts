import { getCustomRepository } from "typeorm";
import { AccountsUserForgotPasswordRepo } from "../repositories/accountsUserForgotPasswordRepo";
import { UserRepo } from "../../users/repositories/userRepo";
import { IDataResetPassword } from "../dtos";
import { AppError } from "../../../shared/error";
import { hash } from "bcryptjs";
import { isAfter, addHours } from "date-fns";

class ResetPasswordUserServices {
  public async resetPassword({
    token,
    password,
  }: IDataResetPassword): Promise<void> {
    const userRepo = getCustomRepository(UserRepo);
    const forgotUserRepo = getCustomRepository(AccountsUserForgotPasswordRepo);

    const user = await forgotUserRepo.findByToken(token);

    if (!user) {
      throw new AppError("User Token not exists", 400);
    }

    const dataUserFinal = await userRepo.findByIdUser(user.user_id);

    if (!dataUserFinal) {
      throw new AppError("User not exists", 400);
    }

    const addHoursFinal = addHours(user.created_at, 2);

    if (isAfter(Date.now(), addHoursFinal)) {
      throw new AppError("Token expires", 400);
    }

    dataUserFinal.password_hash = await hash(password, 8);

    await userRepo.save(dataUserFinal);
  }
}

export { ResetPasswordUserServices };
