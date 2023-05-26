import { Router } from "express";
import loginValidation from "../schemas/loginUserSchema.js";
import { loginUser } from "../controllers/userControllers/userControllers.js";
import paths from "../utils/paths/paths.js";

const userRouter = Router();

userRouter.post(paths.loginController, loginValidation, loginUser);

export default userRouter;
