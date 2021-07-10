import { getCustomRepository } from "typeorm";
import { UserRepo } from "../repositories/userRepo";
import { IReturnOneUser } from "../dtos";
import { AppError } from "../../../shared/error";

class OneUserServices {
  public async oneUser(id: string): Promise<IReturnOneUser> {
    const userRepo = getCustomRepository(UserRepo);

    const user = await userRepo.findByIdUser(id);

    if (!user) {
      throw new AppError("User not exists", 400);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      telefone: user.telefone,
    };
  }
}

export { OneUserServices };
