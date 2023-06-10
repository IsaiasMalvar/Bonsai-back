import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import Microstory from "../../../database/models/Microstory.js";
import {
  type CustomCreateRequest,
  type CustomParamRequest,
} from "../../../types.js";
import {
  privateMessageList,
  statusCodeList,
} from "../../utils/responseData/responseData.js";
import CustomError from "../../../CustomError/CustomError.js";
import { Types } from "mongoose";
import chalk from "chalk";

const debug = createDebug("bonsai-api:controllers:routeControllers");

export const getMicrostories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const microstories = await Microstory.find().limit(10).exec();
    res.status(200).json({ microstories });
  } catch (error) {
    error.message = privateMessageList.deletedError;
    debug(error.message);
    next(error);
  }
};

export const deleteMicrostory = async (
  req: CustomParamRequest,
  res: Response,
  next: NextFunction
) => {
  const { microId } = req.params;

  try {
    const micro = await Microstory.findByIdAndDelete(microId).exec();

    if (!micro) {
      throw new CustomError(
        statusCodeList.notFound,
        privateMessageList.deletedError
      );
    }

    res.status(200).json({ message: privateMessageList.deleted });
  } catch (error) {
    next(error);
  }
};

export const createMicro = async (
  req: CustomCreateRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, body } = req;

    const microCreated = await Microstory.create({
      ...body,
      user: new Types.ObjectId(id),
    });

    res.status(200).json({ micro: microCreated });
  } catch (error: unknown) {
    debug(chalk((error as Error).message));
    next(error);
  }
};
