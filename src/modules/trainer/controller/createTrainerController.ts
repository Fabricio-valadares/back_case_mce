import { Request, Response } from "express";
import { CreateTrainerServices } from "../services/createTrainerService";

class CreateTrainerController {
  public async execute(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { name, email, telefone, password } = request.body;

    const userService = new CreateTrainerServices();

    const newUser = await userService.createService({
      name,
      email,
      telefone,
      password,
    });

    return response.status(201).json(newUser);
  }
}

export { CreateTrainerController };
