import { Request, Response } from "express";
import { OneUserServices } from "../services/oneUserServices";

class OneTrainerController {
  public async execute(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const userService = new OneUserServices();

    const user = await userService.oneUser(id);

    return response.status(200).json(user);
  }
}

export { OneTrainerController };
