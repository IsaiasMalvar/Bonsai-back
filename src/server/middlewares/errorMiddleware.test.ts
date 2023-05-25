import type { NextFunction, Request, Response } from "express";
import { generalError, notFoundError } from "./errorMiddleware.js";
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

describe("Given a generalError middleware", () => {
  describe("When it receives an error without a status code", () => {
    test("Then it should call a response with the status code 500 and the message 'Interal Server Error", () => {
      const error = new Error("Internal Server Error");
      const expectedStatusCode = 500;
      const { message } = error;

      generalError(
        error as CustomError,
        request as Request,
        response as Response,
        next as NextFunction
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(response.json).toHaveBeenCalledWith({ message });
    });
  });
  describe("When it receives an error with a 404 status code and the message 'Endpoint not found'", () => {
    describe("Then it should call a response with the status code 404 and the message 'Endpoint not found", () => {
      const error = new CustomError(404, "Endpoit not found");
      const expectedStatusCode = 404;
      const message = "Endpoit not found";

      generalError(
        error,
        request as Request,
        response as Response,
        next as NextFunction
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(response.json).toHaveBeenCalledWith({ message });
    });
  });
});
