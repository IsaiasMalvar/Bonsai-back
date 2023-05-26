import { type Request } from "express";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserCredentialsStructure extends UserCredentials {
  _id: string;
}

export type CustomRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;
