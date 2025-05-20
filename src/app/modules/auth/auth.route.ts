import express from "express";
import { AuthController } from "./auth.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/login",
  //   validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);

router.post(
  "/change-password",
  auth(USER_ROLE.admin),
  //   validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword
);

router.post(
  "/refresh-token",
  AuthController.refreshToken
);

export const AuthRoutes = router;
