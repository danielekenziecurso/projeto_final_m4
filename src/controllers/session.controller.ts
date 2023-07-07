import { Request, Response } from "express";
import { sessionService } from "../services";
import { SessionReturn } from "../interfaces";

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const token: SessionReturn = await sessionService.createSession(req.body);
  return res.status(200).json(token);
};
export default { createUser };
