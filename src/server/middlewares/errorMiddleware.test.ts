import type { NextFunction, Request, Response } from "express";
import { notFoundError } from "./errorMiddleware.js";
import CustomError from "../../CustomError/CustomError.js";

type CustomResponse = Pick<Response, "status" | "json">;

const response: CustomResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const request = {};
const next = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a notFoundError middleware", () => {
  describe("When it receives a request and a next function", () => {
    test("Then it should call the next function with the error message 'Endpoint not found'", () => {
      const customError = new CustomError(404, "Endpoint not found");

      notFoundError(
        request as Request,
        response as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
