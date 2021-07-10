import { Request, Response } from "express";
import { ForgotPasswordTrainerService } from "../services/forgotPasswordTrainerService";

class ForgotPasswordTrainerController {
  public async execute(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email } = request.body;

    const forgotPasswordService = new ForgotPasswordTrainerService();

    await forgotPasswordService.forgotPasswordTrainer(email);

    return response.status(200).send();
  }
}

export { ForgotPasswordTrainerController };
