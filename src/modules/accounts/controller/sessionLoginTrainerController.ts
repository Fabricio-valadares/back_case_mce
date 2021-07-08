import { Request, Response } from "express";
import { SessionsLoginTrainerService } from "../services/sessionLoginTrainerService";

class SessionLoginTrainerController {
  public async execute(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email, password } = request.body;

    const trainerService = new SessionsLoginTrainerService();

    const token = await trainerService.createTokenLogin({ email, password });

    return response.status(200).json(token);
  }
}

export { SessionLoginTrainerController };
