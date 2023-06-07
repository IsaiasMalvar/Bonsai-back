import { type NextFunction, type Request, type Response } from "express";
import Microstory from "../../../../database/models/Microstory";
import { microstoryListMock } from "../../../../mocks/microstoriesMocks/microstoriesMocks";
import { statusCodeList } from "../../../utils/responseData/responseData";
import { getMicrostories } from "../microstoriesControllers";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getMicrostories controller", () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const req = {};
  const next = jest.fn();
  describe("When it receives a response", () => {
    test("Then it should call the response's method status with 200 ", async () => {
      const expectedStatus = statusCodeList.ok;

      Microstory.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(microstoryListMock),
      });
      await getMicrostories(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
    test("Then it should call the response's method json with a list of microstories", async () => {
      await getMicrostories(
        req as Request,
        res as Response,
        next as NextFunction
      );
      expect(res.json).toHaveBeenCalledWith({
        microstories: microstoryListMock,
      });
    });
  });
  describe("When it receives a next fuction and a rejected error", () => {
    test("Then it should call that next function with that error", async () => {
      const expectedError = new Error("Database error connection");

      Microstory.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await getMicrostories(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
