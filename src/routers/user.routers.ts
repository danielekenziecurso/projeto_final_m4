import { Router } from "express";
import { userControllers } from "../controllers";
import middlewares from "../middlewares";
import { userCreateSchema, userUpdateSchema } from "../schemas";

const clientUser: Router = Router();

clientUser.post(
  "",
  middlewares.validateBodyMiddleware(userCreateSchema),
  middlewares.validateEmailExistsMiddleware,
  userControllers.createUser
);

clientUser.get(
  "",
  middlewares.verifyTokenMiddleware,
  middlewares.verifyIsAdminMiddleware,
  userControllers.readUser
);

clientUser.patch(
  "/:id",
  middlewares.verifyByIdExistsMiddleware,
  middlewares.validateBodyMiddleware(userUpdateSchema),
  middlewares.verifyTokenMiddleware,
  middlewares.verifyUserPermissionMiddleware,
  middlewares.validateEmailExistsMiddleware,
  userControllers.updateuser
);

clientUser.delete(
  "/:id",
  middlewares.verifyByIdExistsMiddleware,
  middlewares.verifyTokenMiddleware,
  middlewares.verifyIsAdminMiddleware,
  userControllers.destroyUser
);

export default clientUser;
