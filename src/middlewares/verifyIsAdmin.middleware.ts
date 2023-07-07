import { NextFunction, Request, Response } from "express";
import { errorsErrors } from "../errors";
import { CategoryCreate, UserReturn } from "../interfaces";

export const verifyIsAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { admin } = res.locals.decoded;
  if (!admin) throw new errorsErrors.AppError("Insufficient permission", 403);

  return next();
};

export default verifyIsAdminMiddleware;
