import { Router } from "express";
import { Role } from "../../../prisma/generated/prisma/client";

import { PaymentController } from "./payment.controller";
import { createCheckoutSessionValidationSchema } from "./payment.validation";

import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";

const router = Router();

router.post(
  "/create-checkout-session",
  auth(Role.TENANT),
  validateRequest(createCheckoutSessionValidationSchema),
  PaymentController.createCheckoutSession
);

export const PaymentRoutes = router;