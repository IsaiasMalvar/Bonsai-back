import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../database/connectToDatabase";
import mongoose from "mongoose";
import Microstory from "../../database/models/Microstory";
import { microstoryListMock } from "../../mocks/microstoriesMocks/microstoriesMocks";
import { app } from "..";
import paths from "../utils/paths/paths";
import { tokenMock } from "../../mocks/userMocks/userMocks";
import { statusCodeList } from "../utils/responseData/responseData";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await Microstory.deleteMany();
});

describe("Given a GET '/microstories' endpoint", () => {
  beforeEach(async () => {
    await Microstory.create(microstoryListMock);
  });

  describe("When it receives a request with a valid token", () => {
    test("Then it should respond with a 200 status code and a list of microstories", async () => {
      const response = await request(app)
        .get(paths.microsController)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(statusCodeList.ok);

      expect(response.body.microstories).toHaveLength(3);
    });
  });

  describe("When it recieve a request with a not valid token", () => {
    test("Then it should return a statusCode 401 ", async () => {
      await request(app)
        .get(paths.microsController)
        .expect(statusCodeList.wrongCredentials);
    });
  });
});
