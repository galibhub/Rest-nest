import { z } from "zod";

export const createCheckoutSessionValidationSchema = z.object({
  body: z.object({
    rentalRequestId: z.string().uuid({
      message: "Invalid rental request ID.",
    }),
  }),
});