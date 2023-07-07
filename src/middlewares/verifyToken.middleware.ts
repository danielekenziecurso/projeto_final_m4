import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { errorsErrors } from "../errors";

const verifyTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authorization: string | undefined = req.headers.authorization;
  if (!authorization)
    throw new errorsErrors.AppError("Missing bearer token", 401);

  const token: string = authorization.split(" ")[1];

  verify(token, process.env.SECRET_KEY!, (err, decoded) => {
    if (err) throw new errorsErrors.AppError(err.message, 401);
    res.locals = { ...res.locals, decoded };
  });

  return next();
};

export default verifyTokenMiddleware;
