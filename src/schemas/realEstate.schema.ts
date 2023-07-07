import { z } from "zod";
import { addressSchema } from "./address.schemas";
import { categorySchema } from "./category.schema";

const realEstateSchema = z.object({
  id: z.number().positive(),
  value: z.string().or(z.number()).default(0),
  size: z.number().positive(),
  address: addressSchema,
  category: categorySchema,
  sold: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const createRealEstateSchema = z.object({
  value: z.string().or(z.number().positive()),
  size: z.number().int().positive(),
  address: z.object({
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().max(7).nullish(),
    city: z.string().max(20),
    state: z.string().max(2),
  }),
  categoryId: z.number().int().positive(),
});
const returnRealEstateSchema = realEstateSchema;
const returnrealEstate = realEstateSchema.array();

export {
  realEstateSchema,
  createRealEstateSchema,
  returnRealEstateSchema,
  returnrealEstate,
};
