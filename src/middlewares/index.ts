import handleErrorMiddleware from "./handleError.middleware";
import validateEmailExistsMiddleware from "./validateEmailExists.middleware";
import validateBodyMiddleware from "./validateBody.middleware";
import verifyTokenMiddleware from "./verifyToken.middleware";
import verifyIsAdminMiddleware from "./verifyIsAdmin.middleware";
import verifyUserPermissionMiddleware from "./verifyUserPermission.middleware";
import verifyByIdExistsMiddleware from "./verifyByIdExistes.middleware";
import validateCategoryExisteMiddleware from "./validateCategoryExiste.middleware";
import validateadressUniqueMiddleware from "./validateadressUnique.middleware";
export default {
  handleErrorMiddleware,
  validateEmailExistsMiddleware,
  validateBodyMiddleware,
  verifyTokenMiddleware,
  verifyIsAdminMiddleware,
  verifyUserPermissionMiddleware,
  verifyByIdExistsMiddleware, 
  validateCategoryExisteMiddleware,
  validateadressUniqueMiddleware
};
