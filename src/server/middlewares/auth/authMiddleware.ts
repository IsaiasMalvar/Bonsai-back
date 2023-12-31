import { type NextFunction, type Response } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../../../CustomError/CustomError.js";
import {
  publicMessageList,
  statusCodeList,
} from "../../utils/responseData/responseData.js";
import { type CustomRequest } from "../../../types";

export const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader?.includes("Bearer")) {
      const error = new CustomError(
        statusCodeList.wrongCredentials,
        "Missing token",
        publicMessageList.wrongCredentials
      );

      throw error;
    }

    const token = authorizationHeader.replace("Bearer ", "");

    const { sub: id } = jwt.verify(token, process.env.JWT_SECRET!);

    req.id = id as string;

    next();
  } catch (error: unknown) {
    const customError =
      (error as Error).name === "JsonWebTokenError"
        ? new CustomError(
            statusCodeList.wrongCredentials,
            "Invalid token",
            publicMessageList.wrongCredentials
          )
        : error;

    next(customError);
  }
};
