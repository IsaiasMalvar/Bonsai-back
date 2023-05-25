import cors from "cors";
import "../loadEnvironment.js";
import express from "express";

export const app = express();

const allowedOrigin = process.env.ALLOWED_ORIGIN;

app.use(
  cors({
    origin: allowedOrigin,
  })
);
