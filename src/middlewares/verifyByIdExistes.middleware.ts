import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { errorsErrors } from "../errors";
import { userRepository } from "../repositories";

const verifyByIdExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = Number(req.params.id);

  const user: User | null = await userRepository.findOneBy({ id });
  if (!user) throw new errorsErrors.NotFound("User not found", 404);

  res.locals = { ...res.locals, user };

  return next();
};

export default verifyByIdExistsMiddleware;
