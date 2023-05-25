import cors from "cors";
import "../loadEnvironment.js";
import express from "express";
import morgan from "morgan";

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
