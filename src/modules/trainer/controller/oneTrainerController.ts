import { Request, Response } from "express";
import { OnerTrainerServices } from "../services/oneTrainerServices";

class OnerTrainerController {
  public async execute(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const trainerService = new OnerTrainerServices();

    const trainer = await trainerService.oneTrainer(id);

    return response.status(200).json(trainer);
  }
}

export { OnerTrainerController };
