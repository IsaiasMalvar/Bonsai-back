import { Router } from "express";
import getMicrostories from "../controllers/microstoriesControllers/microstoriesControllers.js";

const microsRouter = Router();

microsRouter.get("/", getMicrostories);

export default microsRouter;
