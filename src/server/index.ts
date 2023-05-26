import cors from "cors";
import "../loadEnvironment.js";
import express from "express";
import morgan from "morgan";
import pingController from "./controllers/pingController/pingController.js";
import paths from "./paths/paths.js";

export const app = express();

app.disable("x-powered-by");

const allowedOrigin = process.env.ALLOWED_ORIGIN;

app.use(
  cors({
    origin: allowedOrigin,
  })
);

app.use(express.json());

app.use(morgan("dev"));

app.get(paths.pingController, pingController);
