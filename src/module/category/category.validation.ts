import { z } from "zod";

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, "Category name must be at least 3 characters"),

    description: z
      .string()
      .trim()
      .optional(),
  }),
});

export const CategoryValidation = {
  createCategoryValidationSchema,
};