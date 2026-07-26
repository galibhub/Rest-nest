import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from './auth.validation';
import { authController } from "./auth.controller";

const router = Router();

router.post("/register",validateRequest(AuthValidation.registerSchema),authController.registerUser)


export const AuthRoutes = router;