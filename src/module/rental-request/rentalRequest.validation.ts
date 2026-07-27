import { z } from "zod";

const createRentalRequestValidationSchema = z.object({
  body: z.object({
    propertyId: z.string().uuid({
      message: "Invalid property ID.",
    }),

    moveInDate: z.coerce.date(),

    message: z
      .string()
      .trim()
      .max(500, "Message cannot exceed 500 characters.")
      .optional(),
  }),
});

export const RentalRequestValidation = {
  createRentalRequestValidationSchema,
};