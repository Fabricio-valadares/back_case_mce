import { Request, Response } from "express";
import { OneTrainerServices } from "../services/oneTrainerServices";

class OneTrainerController {
  public async execute(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const trainerService = new OneTrainerServices();

    const trainer = await trainerService.oneTrainer(id);

    return response.status(200).json(trainer);
  }
}

export { OneTrainerController };
