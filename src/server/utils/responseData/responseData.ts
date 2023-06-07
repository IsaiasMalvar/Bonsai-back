import { type StatusCodeList, type MessageList } from "./types";

export const publicMessageList: MessageList = {
  ok: {
    ok: "Everything is ok",
    ping: "",
  },
  notFound: "We could not find what you were looking for!",
  generalError: "Oh no! There has been an error",
  wrongCredentials: "Sorry, wrong credentials!",
  deleted: "Micro deleted successfully!",
  deletedError: "Dang it! The micro could not be deleted",
};

export const privateMessageList: MessageList = {
  generalError: "Internal Server Error",
  notFound: "Endpoint not found",
  ok: {
    ok: "OK",
    ping: "Ping!",
  },
  wrongCredentials: "Wrong credentials",
  deleted: "Micro deleted",
  deletedError: "Micro could not be deleted",
};

export const statusCodeList: StatusCodeList = {
  generalError: 500,
  notFound: 404,
  ok: 200,
  wrongCredentials: 401,
};
