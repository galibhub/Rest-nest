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

// Get All Payments
router.get(
  "/",
  auth(Role.ADMIN, Role.LANDLORD, Role.TENANT),
  PaymentController.getAllPayments
);

// Get Single Payment
router.get(
  "/:id",
  auth(Role.ADMIN, Role.LANDLORD, Role.TENANT),
  PaymentController.getSinglePayment
);


export const PaymentRoutes = router;