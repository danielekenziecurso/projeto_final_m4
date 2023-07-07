import { z } from "zod";
import { createcategorySchema } from "../schemas";
import { Category } from "../entities";
import { Repository } from "typeorm";
import { categoryRealEStateSchema, returnCategorySchema } from "../schemas/category.schema";

type CategoryCreate = z.infer<typeof createcategorySchema>;

type CategoryReturn = z.infer<typeof returnCategorySchema>;

type CategoryRepo = Repository<Category>;

type CategoryRealEstate = z.infer<typeof categoryRealEStateSchema>;

export { CategoryCreate, CategoryReturn, CategoryRepo, CategoryRealEstate };
