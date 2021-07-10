import { getCustomRepository } from "typeorm";
import { UserRepo } from "../repositories/userRepo";
import { IUpadateUser, IReturnUpadateUser } from "../dtos";
import { AppError } from "../../../shared/error";
import { hash } from "bcryptjs";

class UpdateUserServices {
  public async updateUser({
    id,
    name,
    email,
    telefone,
    password,
  }: IUpadateUser): Promise<IReturnUpadateUser> {
    const userRepo = getCustomRepository(UserRepo);

    const user = await userRepo.findByIdUser(id);

    if (!user) {
      throw new AppError("User not exists", 400);
    }

    const currentPassword =
      password !== undefined ? password : user.password_hash;

    const passwordHash = await hash(currentPassword, 8);

    user.name = name !== undefined ? name : user.name;
    user.email = email !== undefined ? email : user.email;
    user.telefone = telefone !== undefined ? telefone : user.telefone;
    user.password_hash =
      password !== undefined ? passwordHash : user.password_hash;

    await userRepo.save(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      telefone: user.telefone,
    };
  }
}

export { UpdateUserServices };
