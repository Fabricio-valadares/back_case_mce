import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../shared/error";
import { UpdateTrainerAvatarService } from "../services/updateTrainerAvatar";

class UpdateAvatarTrainerController {
  public async execute(
    request: Request,
    response: Response
  ): Promise<Response> {
    const userService = new UpdateTrainerAvatarService();

    const { id } = request.user;

    const fileSendRequest = request.file?.filename;

    if (!fileSendRequest) {
      throw new AppError("File not send", 400);
    }

    const user = userService.updateAvatarService({
      trainer_id: id,
      avatarFileName: fileSendRequest,
    });

    return response.status(200).json(user);
  }
}

export { UpdateAvatarTrainerController };
