import { z } from "zod";
import { realEstateSchema } from "./realEstate.schema";

const categorySchema = z.object({
  id: z.number().positive(),
  name: z.string().max(45),
});

const createcategorySchema = categorySchema.omit({ id: true, realEstates: true });
const returnCategorySchema = categorySchema.array();
const categoryRealEStateSchema = categorySchema.extend({
  realEstate: realEstateSchema.array(),
})
export { categorySchema, createcategorySchema, returnCategorySchema, categoryRealEStateSchema };