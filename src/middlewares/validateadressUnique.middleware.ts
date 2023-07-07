import { NextFunction, Request, Response } from "express";
import { Address } from "../entities";
import { errorsErrors } from "../errors";
import addressRepository from "../repositories/address.repository";

const validateadressUniqueMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
    const id: number = Number(req.params.id);
  if (!id) return next();

  const address: Address | null = await addressRepository.findOneBy({ id });
  if (address) throw new errorsErrors.AppError("adress already exists", 409);

  return next();
};

export default validateadressUniqueMiddleware;