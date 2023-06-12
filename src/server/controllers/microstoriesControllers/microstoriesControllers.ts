import { type NextFunction, type Response } from "express";
import createDebug from "debug";
import Microstory from "../../../database/models/Microstory.js";
import {
  type CustomCountRequest,
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
  req: CustomCountRequest,
  res: Response,
  next: NextFunction
) => {
  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);
  try {
    const microstories = await Microstory.find().skip(skip).limit(limit).exec();
    const totalMicrostories = await Microstory.where().countDocuments();

    res.status(200).json({ microstories, totalMicrostories });
  } catch (error) {
    error.message = privateMessageList.generalError;
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

    res.status(201).json({ micro: microCreated });
  } catch (error: unknown) {
    debug(chalk((error as Error).message));
    next(error);
  }
};
