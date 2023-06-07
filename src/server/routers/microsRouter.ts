import { Router } from "express";
import {
  deleteMicrostory,
  getMicrostories,
} from "../controllers/microstoriesControllers/microstoriesControllers.js";
import { auth } from "../middlewares/auth/authMiddleware.js";

const microsRouter = Router();

microsRouter.get("/", auth, getMicrostories);
microsRouter.delete("/:microId", auth, deleteMicrostory);

export default microsRouter;
