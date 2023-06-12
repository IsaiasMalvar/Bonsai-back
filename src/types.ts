import { type Request } from "express";
import { type RequestCreateMicroData } from "./server/controllers/types";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserCredentialsStructure extends UserCredentials {
  _id: string;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

export interface CustomRequest extends Request {
  id: string;
}

export interface CustomParamRequest extends Request {
  id: string;
  params: {
    microId: string;
  };
}

export interface CustomCreateRequest extends Request {
  id: string;
  body: RequestCreateMicroData;
}

export interface CustomCountRequest extends Request {
  query: {
    limit: string;
    skip: string;
  };
}
