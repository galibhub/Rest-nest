import { Router } from "express";


import { Role } from "../../../prisma/generated/prisma/enums";
import { ReviewController } from "./review.controller";
import { ReviewValidation } from "./review.validation";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";

const router = Router();

router.post(
  "/",
  auth(Role.TENANT),
  validateRequest(ReviewValidation.createReviewValidation),
  ReviewController.createReview
);

router.get("/", ReviewController.getAllReviews);

router.get("/:id", ReviewController.getSingleReview);

router.patch(
  "/:id",
  auth(Role.TENANT),
  validateRequest(ReviewValidation.updateReviewValidation),
  ReviewController.updateReview
);

router.delete(
  "/:id",
  auth(Role.TENANT),
  ReviewController.deleteReview
);

export const ReviewRoutes = router;