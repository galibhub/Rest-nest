
import { z } from "zod";
import { UserStatus } from "../../../prisma/generated/prisma/enums";

const updateUserStatusValidation = z.object({
  body: z.object({
    status: z.nativeEnum(UserStatus),
  }),
});

export const UserValidation = {
  updateUserStatusValidation,
};