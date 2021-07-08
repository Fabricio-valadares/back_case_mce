import { getCustomRepository } from "typeorm";
import { UserRepo } from "../repositories/userRepo";
import { IDataUserService, IReturnUser } from "../dtos";
import { AppError } from "../../../shared/error";
import { hash } from "bcryptjs";

class CreateUserServices {
  public async createService({
    name,
    email,
    password,
    telefone,
    avatar,
  }: IDataUserService): Promise<IReturnUser> {
    const repoUser = getCustomRepository(UserRepo);

    const user = await repoUser.findByEmailUser(email);

    if (user) {
      throw new AppError("Email already exists", 400);
    }

    const hashPassword = await hash(password, 8);

    const newUser = await repoUser.createUser({
      name,
      email,
      password_hash: hashPassword,
      telefone,
      avatar,
    });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
  }
}

export { CreateUserServices };
