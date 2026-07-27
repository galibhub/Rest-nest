import express from "express";

import { Role } from "../../../prisma/generated/prisma/enums";

import { RentalRequestController } from "./rentalRequest.controller";
import { RentalRequestValidation } from "./rentalRequest.validation";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/",
  auth(Role.TENANT),
  validateRequest(
    RentalRequestValidation.createRentalRequestValidationSchema
  ),
  RentalRequestController.createRentalRequest
);

export const RentalRequestRoutes = router;