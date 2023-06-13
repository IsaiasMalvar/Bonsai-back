import { Router } from "express";
import {
  createMicro,
  deleteMicrostory,
  getMicrostories,
  getMicrostory,
} from "../controllers/microstoriesControllers/microstoriesControllers.js";
import { auth } from "../middlewares/auth/authMiddleware.js";
import paths from "../utils/paths/paths.js";
import { microValidation } from "../schemas/microSchema.js";

const microsRouter = Router();

microsRouter.get("/", auth, getMicrostories);
microsRouter.post(paths.createController, microValidation, createMicro);
microsRouter.delete("/:microId", auth, deleteMicrostory);
microsRouter.get("/:microId", getMicrostory);

export default microsRouter;
