import { Router } from "express";
import { scheduleController } from "../controllers";
import middlewares from "../middlewares";
import { createSchedulesSchema } from "../schemas";

const clientSchedules: Router = Router();

clientSchedules.post(
  "",
  middlewares.verifyTokenMiddleware,
  middlewares.validateBodyMiddleware(createSchedulesSchema),
  scheduleController.createSchedule
);

clientSchedules.get(
  "/realEstate/:id",
  middlewares.verifyTokenMiddleware,
  middlewares.verifyIsAdminMiddleware,
  middlewares.verifyUserPermissionMiddleware,
  scheduleController.readSchedule
);

export default clientSchedules;
