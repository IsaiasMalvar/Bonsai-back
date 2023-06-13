import { type NextFunction, type Response } from "express";
import Microstory from "../../../../database/models/Microstory";
import { microstoryListMock } from "../../../../mocks/microstoriesMocks/microstoriesMocks";
import { type CustomParamRequest } from "../../../../types";
import {
  privateMessageList,
  statusCodeList,
} from "../../../utils/responseData/responseData";
import { getMicrostory } from "../microstoriesControllers";
import CustomError from "../../../../CustomError/CustomError";

describe("Given a getVideogameById controller", () => {
  const next = jest.fn();
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const req: Pick<CustomParamRequest, "params"> = {
    params: { microId: microstoryListMock[0]._id.toString() },
  };

  describe("When it receives a request with an  videogame id and the videogame exist", () => {
    test("Then it should call the response's method status with 200", async () => {
      const expectedStatusCode = statusCodeList.ok;

      Microstory.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(microstoryListMock[0]),
      });

      await getMicrostory(
        req as CustomParamRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should return the response's method json with the videogame", async () => {
      Microstory.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(microstoryListMock[0]),
      });

      await getMicrostory(
        req as CustomParamRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({
        microById: microstoryListMock[0],
      });
    });
  });

  describe("When it receives a request with an invalid micro id, a response and next function", () => {
    test("Then it should call status response  method with the status code 404 and the message 'Micro could not be retrieved'", async () => {
      const next = jest.fn();

      const expectedErrorMessage = new CustomError(
        statusCodeList.notFound,
        privateMessageList.retrievedError
      );

      Microstory.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await getMicrostory(req as CustomParamRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});
