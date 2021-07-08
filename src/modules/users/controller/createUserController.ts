import { Request, Response } from "express";
import { CreateUserServices } from "../services/createUserService";

class CreateUserController {
  public async execute(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { name, email, password, telefone } = request.body;

    const userService = new CreateUserServices();

    const newUser = await userService.createService({
      name,
      email,
      password,
      telefone,
    });

    return response.status(201).json(newUser);
  }
}

export { CreateUserController };
