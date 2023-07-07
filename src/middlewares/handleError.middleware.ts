import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { errorsErrors } from "../errors";
import { JsonWebTokenError } from "jsonwebtoken";

const handleErrorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (error instanceof errorsErrors.AppError) {
    return res.status(error.status).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({message: error.flatten().fieldErrors});
  }
  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({ message: error.message });
  }


  console.error(error);
  return res.status(500).json({ error: "Internal server error" });
};

export default handleErrorMiddleware;
