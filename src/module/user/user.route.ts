import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import { Role } from "../../../prisma/generated/prisma/enums";

const router = express.Router();

router.get(
  "/",
  auth(Role.ADMIN),
  UserController.getAllUsers
);

router.patch(
  "/:id/status",
  auth(Role.ADMIN),
  validateRequest(UserValidation.updateUserStatusValidation),
  UserController.updateUserStatus
);

export const UserRoutes = router;