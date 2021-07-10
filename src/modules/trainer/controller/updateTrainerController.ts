import { Request, Response } from "express";
import { UpdateTrainerServices } from "../services/updateTrainer";

class UpdateTrainerController {
  public async execute(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { name, email, telefone, password } = request.body;
    const { id } = request.params;

    const trainerService = new UpdateTrainerServices();

    const trainerUpdate = await trainerService.updateTrainer({
      id,
      name,
      email,
      telefone,
      password,
    });

    return response.status(200).json(trainerUpdate);
  }
}

export { UpdateTrainerController };
