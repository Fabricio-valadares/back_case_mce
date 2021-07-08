import { getCustomRepository } from "typeorm";
import { AppError } from "../../../shared/error";
import { UserRepo } from "../../users/repositories/userRepo";
import { IDataLogin, IReturnDataTokenLogin } from "../dtos";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import getenv from "getenv";

class SessionsLoginUserService {
  public async createTokenLogin({
    email,
    password,
  }: IDataLogin): Promise<IReturnDataTokenLogin> {
    const useRepo = getCustomRepository(UserRepo);

    const user = await useRepo.findByEmailUser(email);

    if (!user) {
      throw new AppError("Email/Password not exists", 400);
    }

    const comparePassword = await compare(password, user.password_hash);

    if (!comparePassword) {
      throw new AppError("Email/Password not exists", 400);
    }

    const token = sign({}, getenv("SECRET_KEY_TOKEN"), {
      subject: user.id,
      expiresIn: getenv("EXPIRES_TOKEN"),
    });

    return {
      token: token,
    };
  }
}

export { SessionsLoginUserService };
