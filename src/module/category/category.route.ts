import { Router } from "express";

import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";

import { Role } from "../../../prisma/generated/prisma/enums";

import { CategoryController } from "./category.controller";
import { CategoryValidation } from "./category.validation";

const router = Router();

router.post(
  "/",
  auth(Role.ADMIN),
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoryController.createCategory
);

router.get(
  "/",
  CategoryController.getAllCategories
);

export const CategoryRoutes = router;