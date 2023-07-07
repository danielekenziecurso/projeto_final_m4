import { SelectQueryBuilder } from "typeorm";
import { Category, RealEstate } from "../entities";
import {
  CategoryCreate,
  CategoryRealEstate,
  CategoryReturn,
} from "../interfaces";
import { categoryRepository, realEstateRepository } from "../repositories";
import { categoryRealEStateSchema, returnCategorySchema } from "../schemas";
import { errorsErrors } from "../errors";

const createCategory = async (payload: CategoryCreate): Promise<Category> => {
  const category: Category = categoryRepository.create(payload);
  await categoryRepository.save(category);

  return category;
};
const readCategory = async (): Promise<CategoryReturn> => {
  return returnCategorySchema.parse(await categoryRepository.find());
};
const readCategoryRealState = async (
  categoryId: number
): Promise<CategoryRealEstate> => {
  const categoryRealEstate: CategoryRealEstate | null =
    await categoryRepository.findOne({
      where: { id: categoryId },
      relations: { realEstate: true },
    });

  if (!categoryRealEstate) {
    throw new errorsErrors.AppError("Category not found", 404);
  }
  return categoryRealEstate;
};

export default { createCategory, readCategory, readCategoryRealState };
