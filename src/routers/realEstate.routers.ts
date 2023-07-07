import { Router } from "express";
import { realEstateControllers } from "../controllers";
import middlewares from "../middlewares";
import { createRealEstateSchema } from "../schemas";

const clientRealEstate: Router = Router();

clientRealEstate.post(
  "",
  middlewares.verifyTokenMiddleware,
  middlewares.verifyIsAdminMiddleware,
  middlewares.validateBodyMiddleware(createRealEstateSchema),
  realEstateControllers.createrealState
);
clientRealEstate.get("", realEstateControllers.readRealState);

export default clientRealEstate;
