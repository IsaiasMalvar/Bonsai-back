import { type Response, type NextFunction } from "express";
import { type CustomCreateRequest } from "../../../../types";
import { microMock } from "../../../../mocks/microstoriesMocks/microstoriesMocks";
import Microstory from "../../../../database/models/Microstory";
import { createMicro } from "../microstoriesControllers";
import {
  privateMessageList,
  statusCodeList,
} from "../../../utils/responseData/responseData";
import CustomError from "../../../../CustomError/CustomError";
describe("Given a createMicro controller", () => {
  const next = jest.fn();

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a request with valid micro on body, a response and next function", () => {
    test("Then it should call status response method with status code '200' and json response method with the micrp created ", async () => {
      const expectedCode = statusCodeList.created;

      const req: Partial<CustomCreateRequest> = {
        id: "646f93762f3216ee0f1d4b8d",
        body: microMock,
      };

      Microstory.create = jest.fn().mockReturnValue(microMock);

      await createMicro(
        req as CustomCreateRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedCode);
      expect(res.json).toHaveBeenCalledWith({ micro: microMock });
    });
  });
  describe("When it receives a request with invalid micro on its body, a response and next function", () => {
    test("Then it should call next function with error 'Micro could not be created' ", async () => {
      const req: Partial<CustomCreateRequest> = {
        id: "646f93762f3216ee0f1d4b8d",
        body: microMock,
      };
      const error = new CustomError(
        statusCodeList.notFound,
        privateMessageList.createError
      );

      Microstory.create = jest
        .fn()
        .mockRejectedValue(
          new CustomError(
            statusCodeList.notFound,
            privateMessageList.createError
          )
        );
      await createMicro(
        req as CustomCreateRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
