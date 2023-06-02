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
import { auth } from "./middlewares/auth/authMiddleware.js";
import microsRouter from "./routers/microsRouter.js";

export const app = express();

app.disable("x-powered-by");

const allowedOrigin = process.env.ALLOWED_ORIGIN_DEV;

app.use(
  cors({
    origin: allowedOrigin,
  })
);

app.use(express.json());

app.use(morgan("dev"));

app.get(paths.pingController, pingController);

app.use(paths.userController, userRouter);

app.use(paths.microsController, auth, microsRouter);

app.use(notFoundError);

app.use(generalError);
