import { z } from "zod";

const createPropertyValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(5, "Title must be at least 5 characters long")
      .max(100, "Title cannot exceed 100 characters"),

    description: z
      .string()
      .trim()
      .min(20, "Description must be at least 20 characters long"),

    address: z
      .string()
      .trim()
      .min(5, "Address is required"),

    city: z
      .string()
      .trim()
      .min(2, "City is required"),

    rentAmount: z
      .number()
      .positive("Rent amount must be greater than 0"),

    bedrooms: z
      .number()
      .int("Bedrooms must be an integer")
      .min(1, "Property must have at least 1 bedroom"),

    bathrooms: z
      .number()
      .int("Bathrooms must be an integer")
      .min(1, "Property must have at least 1 bathroom"),

    amenities: z
      .array(z.string().trim())
      .min(1, "At least one amenity is required"),

    images: z
      .array(z.string().url("Each image must be a valid URL"))
      .min(1, "At least one image is required"),

    categoryId: z
      .string()
      .uuid("Invalid category id"),
  }),
});

export const PropertyValidation = {
  createPropertyValidationSchema,
};