import { NextFunction, Request, Response } from "express";
import { Category } from "../entities";
import { errorsErrors } from "../errors";
import { categoryRepository } from "../repositories";

const validateCategoryExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const name: string = req.body.name;

  if (!name) {
    return next();
  }

  const category: Category | null = await categoryRepository.findOneBy({ name });

  if (category) {
    return next(new errorsErrors.AppError("Category already exists", 409));
  }

  return next();
};

export default validateCategoryExistsMiddleware;
