import cors from "cors";
import "../loadEnvironment.js";
import express from "express";
import morgan from "morgan";
import pingController from "./controllers/pingController/pingController.js";
import paths from "./utils/paths/paths.js";
import {
  generalError,
  notFoundError,
} from "./middlewares/error/errorMiddleware.js";
import userRouter from "./routers/userRouter.js";
import microsRouter from "./routers/microsRouter.js";
import { auth } from "./middlewares/auth/authMiddleware.js";

export const app = express();

app.disable("x-powered-by");

const allowedOrigins = [
  process.env.ALLOWED_ORIGIN_DEV!,
  process.env.ALLOWED_ORIGIN_PROD!,
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json());

app.use(morgan("dev"));

app.get(paths.pingController, pingController);

app.use(paths.userController, userRouter);

app.use(paths.microsController, auth, microsRouter);

app.use(notFoundError);

app.use(generalError);
