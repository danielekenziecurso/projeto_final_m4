import { z } from "zod";
import {
  createRealEstateSchema,
  returnRealEstateSchema,
  returnrealEstate,
} from "../schemas";
import { RealEstate } from "../entities";
import { Repository } from "typeorm";

type RealEstateCreate = z.infer<typeof createRealEstateSchema>;

type RealEstateReturn = z.infer<typeof returnrealEstate>;

type RealEstateAdressReturn = z.infer<typeof returnRealEstateSchema>;

type RealEstateRepo = Repository<RealEstate>;

export {
  RealEstateCreate,
  RealEstateReturn,
  RealEstateAdressReturn,
  RealEstateRepo,
};
