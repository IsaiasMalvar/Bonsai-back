export interface OkStructure {
  ok: string;
  ping: string;
}
export interface MessageList {
  ok: OkStructure;
  notFound: string;
  wrongCredentials: string;
  generalError: string;
  deleted: string;
  deletedError: string;
  create: string;
  createError: string;
}

export interface StatusCodeList {
  ok: number;
  notFound: number;
  wrongCredentials: number;
  generalError: number;
  add: number;
  badRequest: number;
  created: number;
}
