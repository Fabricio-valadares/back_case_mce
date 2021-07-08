import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { user } from "./http/router/userRouter";
import { trainer } from "./http/router/trainerRouter";
import { AppError } from "./error";
import { connectdb } from "../shared/typeorm";
import configUpload from "./config/uploadAvatar";

connectdb();
const app = express();
app.use(express.json());

app.use("/api/file", express.static(configUpload.directory));
app.use("/api", user);
app.use("/api", trainer);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.status).json({
        status: "error",
        message: error.message,
      });
    }
    return response.status(500).json({
      error: "error",
      messagem: "Interval error server",
    });
  }
);

app.listen(3333, () => {
  console.log("Server rodando !");
});
