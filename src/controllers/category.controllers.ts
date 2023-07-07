import { Request, Response } from "express";
import { categoryServices } from "../services";
import { Category } from "../entities";
import { CategoryReturn } from "../interfaces";

const createCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const category: Category = await categoryServices.createCategory(req.body);
  return res.status(201).json(category);
};
const readCategory = async (req: Request, res: Response): Promise<Response> => {
  const categories: CategoryReturn = await categoryServices.readCategory();
  return res.status(200).json(categories);
};
const readCategoryRealState = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);
  const category = await categoryServices.readCategoryRealState(id);

  return res.status(200).json(category);
};

export default { createCategory, readCategory, readCategoryRealState };
