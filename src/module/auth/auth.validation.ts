import { z } from "zod";

const registerSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(30, "Name cannot exceed 30 characters"),

    email: z.string().email("Please provide a valid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 8 characters long")
      .max(20, "Password cannot exceed 20 characters long"),

    role: z.enum(["TENANT", "LANDLORD"], {
      error: "Role must be TENANT or LANDLORD",
    }),

    phone: z.string().optional(),

    profileImage: z.string().url().optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Please provide a valid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 8 characters long")
      .max(20, "Password cannot exceed 20 characters long"),
  }),
});

export const AuthValidation = {
  registerSchema,
  loginSchema,
};
