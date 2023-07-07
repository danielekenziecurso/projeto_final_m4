import { Router } from "express";
import { categoryControllers } from "../controllers";
import middlewares from "../middlewares";
import { createcategorySchema } from "../schemas";

const clientCategories: Router = Router();

clientCategories.post(
  "",
  middlewares.verifyTokenMiddleware,
  middlewares.verifyIsAdminMiddleware,
  middlewares.validateBodyMiddleware(createcategorySchema),
  middlewares.validateCategoryExisteMiddleware,
  categoryControllers.createCategory
);

clientCategories.get("", categoryControllers.readCategory);

clientCategories.get("/:id/realEstate", categoryControllers.readCategoryRealState);

export default clientCategories;
