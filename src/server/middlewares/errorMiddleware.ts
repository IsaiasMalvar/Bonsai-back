import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError";
import {
  privateMessageList,
  statusCodeList,
} from "../utils/responseData/responseData";

const debug = createDebug("bonsai-api:server:middlewares:errorMiddlewares");

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const error = new CustomError(
    statusCodeList.notFound,
    privateMessageList.notFound
  );
  next(error);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(error.message);

  const statusCode = error.statusCode || statusCodeList.generalError;
  const message = error.statusCode
    ? error.publicMessage
    : privateMessageList.generalError;

  res.status(statusCode).json({ message });
};
