import bcrypt from "bcryptjs";
import { type NextFunction, type Response } from "express";
import { type CustomRequest } from "../../../types";
import User from "../../../database/models/User";
import CustomError from "../../../CustomError/CustomError";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const loginUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, username } = req.body;

    const user = await User.findOne({ username }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new CustomError(401, "Wrong credentials");
      throw error;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      name: username,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
