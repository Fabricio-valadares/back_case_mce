import { Request, Response } from "express";
import { ResetPasswordTrainerServices } from "../services/resetPasswordTrainerService";

class ResetPasswordTrainerController {
  public async execute(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { token, password } = request.body;

    const resetPasswordService = new ResetPasswordTrainerServices();

    await resetPasswordService.resetPassword({ token, password });

    return response.status(200).send();
  }
}

export { ResetPasswordTrainerController };
