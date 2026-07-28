import { z } from "zod";

const createReviewValidation = z.object({
  body: z.object({
    propertyId: z.string().uuid(),
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
  }),
});

const updateReviewValidation = z.object({
  body: z.object({
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().optional(),
  }),
});



export const ReviewValidation = {
  createReviewValidation,
  updateReviewValidation,
};