import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import Microstory from "../../../database/models/Microstory.js";
import { type CustomParamRequest } from "../../../types.js";
import {
  privateMessageList,
  publicMessageList,
  statusCodeList,
} from "../../utils/responseData/responseData.js";

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
    const foundMicroId = await Microstory.findById(microId).exec();

    if (foundMicroId) {
      await Microstory.findByIdAndDelete(microId).exec();
      res.status(200).json({ message: publicMessageList.deleted });
    } else {
      res
        .status(statusCodeList.notFound)
        .json({ message: publicMessageList.deletedError });
    }
  } catch (error) {
    error.message = privateMessageList.deletedError;

    next(error);
  }
};