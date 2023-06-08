import Microstory from "../../../../database/models/Microstory";
import { Types } from "mongoose";
import { type Response, type NextFunction } from "express";
import { type CustomParamRequest, type CustomRequest } from "../../../../types";
import { deleteMicrostory } from "../microstoriesControllers";
import {
  privateMessageList,
  statusCodeList,
} from "../../../utils/responseData/responseData";
import CustomError from "../../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a deleteMicrostories controller", () => {
  const next: NextFunction = jest.fn();

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const microId = new Types.ObjectId().toString();
  const id = new Types.ObjectId().toString();

  const req: Partial<CustomRequest> = {
    params: {
      microId,
    },
    id,
  };

  describe("When it receives a request with an existing micro id , a response and next function", () => {
    test("Then it should call status response method with status code '200' and json method with message 'Micro deleted'", async () => {
      const expectedCode = statusCodeList.ok;
      const expectedMessage = privateMessageList.deleted;

      Microstory.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(microId),
      });

      await deleteMicrostory(req as CustomParamRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedCode);
      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("When it receives a request with an invalid micro id, a response and next function", () => {
    test("Then it should call status response method with status code 400 and json method with message 'Micro could not be deleted'", async () => {
      const next = jest.fn();
      const expectedCode = statusCodeList.notFound;
      const expectedMessage = privateMessageList.deletedError;
      const error = new CustomError(expectedCode, expectedMessage);

      Microstory.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      await deleteMicrostory(req as CustomParamRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
