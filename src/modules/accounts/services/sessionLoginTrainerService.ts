import { getCustomRepository } from "typeorm";
import { AppError } from "../../../shared/error";
import { TrainerRepo } from "../../trainer/repositories/trainerRepo";
import { IDataLogin, IReturnDataTokenLogin } from "../dtos";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import getenv from "getenv";

class SessionsLoginTrainerService {
  public async createTokenLogin({
    email,
    password,
  }: IDataLogin): Promise<IReturnDataTokenLogin> {
    const trainerRepo = getCustomRepository(TrainerRepo);

    const trainer = await trainerRepo.findByEmailTrainer(email);

    if (!trainer) {
      throw new AppError("Email/Password not exists", 400);
    }

    const comparePassword = await compare(password, trainer.password_hash);

    if (!comparePassword) {
      throw new AppError("Email/Password not exists", 400);
    }

    const token = sign({}, getenv("SECRET_KEY_TOKEN"), {
      subject: trainer.id,
      expiresIn: getenv("EXPIRES_TOKEN"),
    });

    return {
      token: token,
    };
  }
}

export { SessionsLoginTrainerService };
