import { type NextFunction, type Response } from "express";
import Microstory from "../../../../database/models/Microstory";
import { microstoryListMock } from "../../../../mocks/microstoriesMocks/microstoriesMocks";
import {
  privateMessageList,
  statusCodeList,
} from "../../../utils/responseData/responseData";
import { getMicrostories } from "../microstoriesControllers";
import { type CustomCountRequest } from "../../../../types";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getMicrostories controller", () => {
  const next = jest.fn();
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const req = {
    query: {
      limit: 10,
      skip: 20,
    },
  };
  describe("When it receives a response", () => {
    test("Then it should call the response's method status with 200 ", async () => {
      const expectedStatus = statusCodeList.ok;

      Microstory.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(microstoryListMock),
            }),
          }),
        }),
      });

      Microstory.where = jest.fn().mockReturnValue({
        countDocuments: jest.fn().mockReturnValue(microstoryListMock.length),
      });

      await getMicrostories(
        req as unknown as CustomCountRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
  describe("When it receives a next function and a rejected error", () => {
    test("Then it should call that next function with that error", async () => {
      const expectedError = new Error(privateMessageList.generalError);

      Microstory.find = jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            exec: jest.fn().mockRejectedValue(expectedError),
          }),
        }),
      });

      await getMicrostories(
        req as unknown as CustomCountRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
