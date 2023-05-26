import "../../loadEnvironment.js";
import jwt from "jsonwebtoken";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import User from "../../database/models/User.js";
import { type UserCredentials } from "../../types.js";
import {
  privateMessageList,
  statusCodeList,
} from "../utils/responseData/responseData.js";
import paths from "../utils/paths/paths.js";
import { app } from "..";
import connectToDatabase from "../../database/connectToDatabase.js";

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
  await User.deleteMany();
});

const mockUserLogin: UserCredentials = {
  username: "RobertB",
  password: "RobertBC",
};

const mockUserHashed: UserCredentials = {
  username: "RobertB",
  password: "$2y$10$eIdQ4.qho7xcArSwjs1LM.UAO2Uh1ntnTnZHEdqCFL0rW7aI1eRJO",
};

const mockInvalidUserLogin: UserCredentials = {
  username: "RovertV",
  password: "XXX",
};

const mockInvalidUserLoginFormat = {
  username: "RovertV",
  password: 1,
};
describe("Given a  POST 'user/login' endpoint", () => {
  beforeEach(async () => {
    await User.create(mockUserHashed);
  });
  describe("When it receives a request with valid credentials", () => {
    test("Then it should respond with a 200 status code and a token", async () => {
      const expectedStatus = statusCodeList.ok;

      const newUser = await User.findOne({
        username: mockUserLogin.username,
      }).exec();

      const response = await request(app)
        .post(`${paths.userController}${paths.loginController}`)
        .send(mockUserLogin)
        .expect(expectedStatus);

      const payload = jwt.verify(
        response.body.token as string,
        process.env.JWT_SECRET!
      );

      const userId = payload.sub;

      expect(userId).toEqual(newUser?._id.toString());
    });

    describe("When it receives a request with invalid credentials", () => {
      test("Then it should respond with a 401 status and the 'Wrong credentials' message", async () => {
        const expectedStatus = statusCodeList.wrongCredentials;
        const expectedMessage = privateMessageList.wrongCredentials;

        const response = await request(app)
          .post(`${paths.userController}${paths.loginController}`)
          .send(mockInvalidUserLogin)
          .expect(expectedStatus);

        expect(response.body.message).toBe(expectedMessage);
      });
    });

    describe("When it receives a number instead of a word as a password", () => {
      test("Then it should respond with a 400 status and the 'password must be a string", async () => {
        const expectedStatus = 400;
        const expectedMessage = "password must be a string";

        const response = await request(app)
          .post(`${paths.userController}${paths.loginController}`)
          .send(mockInvalidUserLoginFormat)
          .expect(expectedStatus);

        expect(response.body.message).toBe(expectedMessage);
      });
    });
  });
});
