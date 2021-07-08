import { Request, Response } from "express";
import { SessionsLoginUserService } from "../services/sessionLoginUserService";

class SessionLoginUserController {
  public async execute(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email, password } = request.body;

    const userService = new SessionsLoginUserService();

    const token = await userService.createTokenLogin({ email, password });

    return response.status(200).json(token);
  }
}

export { SessionLoginUserController };
