import request from "supertest";
import { app } from "../..";
import {
  privateMessageList,
  statusCodeList,
} from "../../utils/responseData/responseData";

describe("Given a GET '/' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 200 status and a 'Ping!' message", async () => {
      const expectedStatus = statusCodeList.ok;
      const expectedMessage = privateMessageList.ok.ping;

      const response = await request(app).get("/").expect(expectedStatus);

      expect(response.body).toStrictEqual({ message: expectedMessage });
    });
  });
});
