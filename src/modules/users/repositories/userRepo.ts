import { EntityRepository, Repository } from "typeorm";
import { userEntitie } from "../typeorm/entities/userEntities";
import { IDataUser } from "../dtos";

@EntityRepository(userEntitie)
class UserRepo extends Repository<userEntitie> {
  public async createUser({
    name,
    email,
    password_hash,
    telefone,
    avatar,
  }: IDataUser): Promise<userEntitie> {
    const newUser = this.create({
      name,
      email,
      password_hash,
      telefone,
      avatar,
    });

    await this.save(newUser);

    return newUser;
  }

  public async findByIdUser(id: string): Promise<userEntitie | undefined> {
    const user = await this.findOne(id);

    return user;
  }

  public async findByEmailUser(
    email: string
  ): Promise<userEntitie | undefined> {
    const user = await this.findOne({ email });

    return user;
  }
}

export { UserRepo };
