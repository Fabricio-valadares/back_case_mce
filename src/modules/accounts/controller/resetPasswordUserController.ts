import { Request, Response } from "express";
import { ResetPasswordUserServices } from "../services/resetPasswordUserService";

class ResetPasswordUserController {
  public async execute(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { token, password } = request.body;

    const resetPasswordService = new ResetPasswordUserServices();

    await resetPasswordService.resetPassword({ token, password });

    return response.status(200).send();
  }
}

export { ResetPasswordUserController };
