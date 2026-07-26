import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from './auth.validation';
import { authController } from "./auth.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/register",validateRequest(AuthValidation.registerSchema),authController.registerUser)

router.post(
  "/login",
  validateRequest(AuthValidation.loginSchema),
  authController.loginUser
);

router.get(
  "/me",
  auth(),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Protected Route",
      user: req.user,
    });
  }
);
export const AuthRoutes = router;