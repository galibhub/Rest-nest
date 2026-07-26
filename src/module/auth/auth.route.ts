import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from './auth.validation';
import { authController } from "./auth.controller";

const router = Router();

router.post("/register",validateRequest(AuthValidation.registerSchema),authController.registerUser)

router.post(
  "/login",
  validateRequest(AuthValidation.loginSchema),
  authController.loginUser
);

export const AuthRoutes = router;