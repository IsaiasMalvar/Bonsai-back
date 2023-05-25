import { type Request, type Response } from "express";
import pingController from "./pingController";

type CustomResponse = Pick<Response, "status" | "json">;

const response: CustomResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const request = {};

describe("Given a pingController controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call the status method with the code 200 and the message 'Ping!'", () => {
      const expectedCode = 200;
      const message = "Ping!";

      pingController(request as Request, response as Response);

      expect(response.status).toHaveBeenCalledWith(expectedCode);
      expect(response.json).toHaveBeenCalledWith({ message });
    });
  });
});
