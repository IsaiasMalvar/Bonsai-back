import { type Request, type Response } from "express";

const pingController = (req: Request, res: Response) => {
  const message = "Ping!";
  res.status(200).json({ message });
};

export default pingController;
