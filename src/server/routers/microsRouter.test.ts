import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../database/connectToDatabase";
import mongoose from "mongoose";
import Microstory from "../../database/models/Microstory";
import {
  microMock,
  microstoryListMock,
  microstoryListMockById,
} from "../../mocks/microstoriesMocks/microstoriesMocks";
import { app } from "..";
import paths from "../utils/paths/paths";
import { tokenMock } from "../../mocks/userMocks/userMocks";
import {
  privateMessageList,
  statusCodeList,
} from "../utils/responseData/responseData";

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

  describe("When it receives a request with a not valid token", () => {
    test("Then it should return a statusCode 401 ", async () => {
      await request(app)
        .get(paths.microsController)
        .expect(statusCodeList.wrongCredentials);
    });
  });
});

describe("Given a DELETE '/micros/:microsId'", () => {
  describe("When it receives a request with a valid microId on the params", () => {
    beforeEach(async () => {
      await Microstory.create(microstoryListMock);
    });
    test("Then it should respond with a 200 status code and the message 'Micro deleted'", async () => {
      const expectedStatusCode = statusCodeList.ok;
      const expectedMessage = privateMessageList.deleted;

      const micros = await Microstory.find().exec();

      const response = await request(app)
        .delete(`/micros/${micros[0]._id.toString()}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(expectedStatusCode);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});

describe("Given a POST '/micros/create' endpoint ", () => {
  describe("When it receives a request with a valid micro on body", () => {
    test("Then it should respond a status 200 and a micro created", async () => {
      const statusCodeExpected = statusCodeList.created;

      const response = await request(app)
        .post(`${paths.microsController}${paths.createController}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .send(microMock)
        .expect(statusCodeExpected);

      expect(response.body).toHaveProperty("micro.title");
    });
  });
});

describe("Given a GET '/micros/:microId' endpoint ", () => {
  describe("When it receives a request with a valid micro id ", () => {
    beforeEach(async () => {
      await Microstory.create(microstoryListMock);
    });
    test("Then it should respond with a status 200 and the matching micro", async () => {
      const statusCodeExpected = statusCodeList.ok;

      const response = await request(app)
        .get(
          `${paths.microsController}/${microstoryListMock[0]._id.toString()}`
        )
        .set("Authorization", `Bearer ${tokenMock}`)

        .expect(statusCodeExpected);

      expect(response.body.microById).toStrictEqual(microstoryListMockById[0]);
    });
  });
});
