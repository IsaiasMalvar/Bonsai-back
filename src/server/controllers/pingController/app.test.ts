import request from "supertest";
import { app } from "../..";

describe("Given a GET '/' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 200 status and a 'Ping!' message", async () => {
      const expectedStatus = 200;
      const expectedMessage = "Ping!";

      const response = await request(app).get("/").expect(expectedStatus);

      expect(response.body).toStrictEqual({ message: expectedMessage });
    });
  });
});
