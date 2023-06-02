import bcrypt from "bcryptjs";
import { type NextFunction, type Response } from "express";
import { type UserCredentialsRequest } from "../../../types.js";
import User from "../../../database/models/User.js";
import CustomError from "../../../CustomError/CustomError.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import {
  privateMessageList,
  statusCodeList,
} from "../../utils/responseData/responseData.js";

export const loginUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, username } = req.body;

    const user = await User.findOne({ username }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new CustomError(
        statusCodeList.wrongCredentials,
        privateMessageList.wrongCredentials
      );
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
