import Microstory from "../../../../database/models/Microstory";
import { Types } from "mongoose";
import { type Response, type NextFunction } from "express";
import { type CustomParamRequest, type CustomRequest } from "../../../../types";
import { deleteMicrostory } from "../microstoriesControllers";
import {
  privateMessageList,
  publicMessageList,
  statusCodeList,
} from "../../../utils/responseData/responseData";

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
  describe("When it receives a request with a valid micro id , a response and next function", () => {
    test("Then it should call status response method with status code '200' and the message 'Micro deleted successfully!'", async () => {
      const expectedStatusCode = statusCodeList.ok;
      const expectedMessage = publicMessageList.deleted;

      Microstory.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(microId),
      });
      Microstory.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(microId),
      });

      await deleteMicrostory(req as CustomParamRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
  describe("When it receives a request with an invalid microid, a response and next function", () => {
    test("Then it should call status response method with status code 400 and the message 'Dang it! The micro could not be deleted'", async () => {
      const invalidMicroId = new Types.ObjectId().toString();
      const expectedStatusCode = statusCodeList.notFound;
      const expectedMessage = publicMessageList.deletedError;

      const req: Partial<CustomRequest> = {
        params: {
          microId,
        },
        id: invalidMicroId,
      };

      Microstory.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      await deleteMicrostory(req as CustomParamRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
  describe("When it receives a request with an invalid micro id, a response and next function", () => {
    test("Then it should call the next function with the error 'Micro could not be deleted'", async () => {
      const expectedError = new Error(privateMessageList.deletedError);

      Microstory.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await deleteMicrostory(req as CustomParamRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
