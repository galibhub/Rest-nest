import express from "express";

import { Role } from "../../../prisma/generated/prisma/enums";

import { RentalRequestController } from "./rentalRequest.controller";
import { RentalRequestValidation } from "./rentalRequest.validation";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.get(
  "/landlord",
  auth(Role.LANDLORD),
  RentalRequestController.getLandlordRentalRequests
);

router.post(
  "/",
  auth(Role.TENANT),
  validateRequest(
    RentalRequestValidation.createRentalRequestValidationSchema
  ),
  RentalRequestController.createRentalRequest
);

router.patch(
  "/:id/approve",
  auth(Role.LANDLORD),
  RentalRequestController.approveRentalRequest
);
router.patch(
  "/:id/reject",
  auth(Role.LANDLORD),
  RentalRequestController.rejectRentalRequest
);


export const RentalRequestRoutes = router;