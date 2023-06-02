import jwt from "jsonwebtoken";
import { type Request, type NextFunction, type Response } from "express";
import {
  tokenMock,
  tokenPayloadMock,
} from "../../../mocks/userMocks/userMocks";
import { auth } from "./authMiddleware";
import { type CustomRequest } from "../../../types";
import CustomError from "../../../CustomError/CustomError";
import { statusCodeList } from "../../utils/responseData/responseData";
import { privateMessageList } from "../../utils/responseData/responseData";

beforeEach(() => {
  jest.clearAllMocks();
});
describe("Given an auth middleware", () => {
  const req: Pick<Request, "header"> = {
    header: jest.fn().mockReturnValue(`Bearer ${tokenMock}`),
  };

  const res = {};

  const next = jest.fn();
  describe("When it receives a valid token with an 'Authorization' header and a next function", () => {
    test("then it should call the function", () => {
      jwt.verify = jest.fn().mockReturnValue(tokenPayloadMock);

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives an invalid token with an 'Authorization' header and a next function", () => {
    test("then it should call the function with a 401 error and the message 'Invalid token'", () => {
      const expectedError = new CustomError(
        statusCodeList.wrongCredentials,
        "Invalid token",
        privateMessageList.wrongCredentials
      );

      expectedError.name = "JsonWebTokenError";

      const req: Pick<Request, "header"> = {
        header: jest.fn().mockReturnValue("Wrong Bearer "),
      };

      jwt.verify = jest.fn().mockImplementation(() => {
        throw expectedError;
      });

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a header that does not include either the token or 'Bearer' and a next function", () => {
    test("then it should call the function with a 401 error and the message 'Missing token' ", () => {
      const expectedError = new CustomError(
        statusCodeList.wrongCredentials,
        "Missing token",
        privateMessageList.wrongCredentials
      );

      expectedError.name = "JsonWebTokenError";

      const req: Pick<Request, "header"> = {
        header: jest.fn().mockReturnValue(""),
      };

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
