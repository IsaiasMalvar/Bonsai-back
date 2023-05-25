import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError";

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const error = new CustomError(404, "Endpoint not found");
  next(error);
};
