import { NextFunction, Request, Response } from "express";
import { errorsErrors } from "../errors";

const verifyUserPermissionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { sub, admin } = res.locals.decoded;

  if (admin) {
    return next();
  }

  if (id !== sub && id !== admin) {
    throw new errorsErrors.AppError("Insufficient permission", 403);
  }

  return next();
};

export default verifyUserPermissionMiddleware;
