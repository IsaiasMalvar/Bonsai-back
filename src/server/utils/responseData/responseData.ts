import {
  type StatusCodeList,
  type PrivateMessageList,
  type PublicMessageList,
} from "./types";

export const publicMessageList: PublicMessageList = {
  ok: "Everything is ok!",
  notFound: "We could not find what you were looking for!",
  generalError: "Oh no! There has been an error",
  wrongCredentials: "Sorry, wrong credentials!",
};

export const privateMessageList: PrivateMessageList = {
  generalError: "Internal Server Error",
  notFound: "Endpoint not found",
  ok: "OK",
  wrongCredentials: "Wrong credentials",
};

export const statusCodeList: StatusCodeList = {
  generalError: 500,
  notFound: 404,
  ok: 200,
  wrongCredentials: 401,
};
