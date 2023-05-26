import { type NextFunction, type Request, type Response } from "express";
import Microstory from "../../../database/models/Microstory";

const getMicrostories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const microstories = await Microstory.find().limit(10).exec();
    res.status(200).json({ microstories });
  } catch (error) {
    next(error);
  }
};

export default getMicrostories;
