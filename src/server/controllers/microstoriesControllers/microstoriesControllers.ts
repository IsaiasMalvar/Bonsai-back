import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import Microstory from "../../../database/models/Microstory.js";

const debug = createDebug("bonsai-api:controllers:routeControllers");

const getMicrostories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const microstories = await Microstory.find().limit(10).exec();
    res.status(200).json({ microstories });
  } catch (error) {
    error.message = "Database error connection";
    debug(error.message);
    next(error);
  }
};

export default getMicrostories;
