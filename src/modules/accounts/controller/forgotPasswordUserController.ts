import { Request, Response } from "express";
import { ForgotPasswordUserService } from "../services/forgotPasswordUserService";

class ForgotPasswordUserController {
  public async execute(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email } = request.body;

    const forgotPasswordService = new ForgotPasswordUserService();

    await forgotPasswordService.forgotPasswordUser(email);

    return response.status(200).send();
  }
}

export { ForgotPasswordUserController };
