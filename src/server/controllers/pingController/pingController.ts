import { type Request, type Response } from "express";
import {
  privateMessageList,
  statusCodeList,
} from "../../utils/responseData/responseData.js";

const pingController = (req: Request, res: Response) => {
  const message = privateMessageList.ok.ping;
  res.status(statusCodeList.ok).json({ message });
};

export default pingController;
