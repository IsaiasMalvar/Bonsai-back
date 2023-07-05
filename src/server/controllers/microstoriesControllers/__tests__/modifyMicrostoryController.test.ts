import { type NextFunction, type Response } from "express";
import { microMockData } from "../../../../mocks/microstoriesMocks/microstoriesMocks";
import Microstory from "../../../../database/models/Microstory";
import { modifyMicrostory } from "../microstoriesControllers";
import { type CustomRequestModify } from "../../../../types";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a modifyMicro controller", () => {
  const next = jest.fn();

  const req: Partial<CustomRequestModify> = {
    userId: "646f93762f3216ee0f1d4b8d",
    body: microMockData,
  };

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  describe("When it receives a request with a valid micro on body, a response ans next function", () => {
    test("Then it should call status response method with status code '200' and json response method with the micro modified", async () => {
      const expectedCode = 200;

      Microstory.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(microMockData),
      });

      await modifyMicrostory(
        req as CustomRequestModify,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedCode);
      expect(res.json).toHaveBeenCalledWith({ micro: microMockData });
    });
  });
  describe("When it receives a request with a invalid micro on body, a response and next function", () => {
    test("Then it should calls the next function with an error 'Could not update the desired micro'", async () => {
      const error = new Error("Could not update the desired micro");

      Microstory.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(error),
      });

      await modifyMicrostory(
        req as CustomRequestModify,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
