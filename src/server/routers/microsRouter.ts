import { Router } from "express";
import {
  createMicro,
  deleteMicrostory,
  getMicrostories,
} from "../controllers/microstoriesControllers/microstoriesControllers.js";
import { auth } from "../middlewares/auth/authMiddleware.js";
import paths from "../utils/paths/paths.js";

const microsRouter = Router();

microsRouter.get("/", auth, getMicrostories);
microsRouter.post(paths.createController, auth, createMicro);
microsRouter.delete("/:microId", auth, deleteMicrostory);

export default microsRouter;
