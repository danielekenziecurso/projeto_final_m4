import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { errorsErrors } from "../errors";
import { userRepository } from "../repositories";

const validateEmailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const email: string = req.body.email;

  if (!email) {
    return next();
  }

  const user: User | null = await userRepository.findOneBy({ email });
  if (user) {
    throw new errorsErrors.Conflict("Email already exists", 409);
  }

  return next();
};

export default validateEmailExistsMiddleware;
