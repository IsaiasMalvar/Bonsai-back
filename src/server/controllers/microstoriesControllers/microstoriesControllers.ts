import { type NextFunction, type Response } from "express";
import createDebug from "debug";
import Microstory from "../../../database/models/Microstory.js";
import {
  type CustomRequestModify,
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
  const { filter } = req.query;
  const { filterValue } = req.query;

  try {
    if (filter) {
      const microstories = await Microstory.find({ [filter]: filterValue })
        .skip(skip)
        .limit(limit)
        .exec();
      const totalMicrostories = await Microstory.where({
        [filter]: filterValue,
      })
        .countDocuments()
        .exec();

      res.status(200).json({ microstories, totalMicrostories });
    } else {
      const microstories = await Microstory.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
      const totalMicrostories = await Microstory.where().countDocuments();

      res.status(200).json({ microstories, totalMicrostories });
    }
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

export const getMicrostory = async (
  req: CustomParamRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { microId } = req.params;

    const microById = await Microstory.findById(microId).exec();

    if (!microById) {
      const error = new CustomError(
        statusCodeList.notFound,
        privateMessageList.retrievedError
      );

      throw error;
    }

    res.status(statusCodeList.ok).json({ microById });
  } catch (error) {
    next(error);
  }
};

export const modifyMicrostory = async (
  req: CustomRequestModify,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;

  try {
    const micro = await Microstory.findByIdAndUpdate(
      { _id: body.id },
      {
        ...body,
      }
    ).exec();

    return res.status(200).json({ micro });
  } catch (error: unknown) {
    debug(chalk.redBright((error as Error).message));
    (error as Error).message = "Could not update the desired micro";
    next(error);
  }
};
