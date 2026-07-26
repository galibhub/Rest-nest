import { Role } from "../../../prisma/generated/prisma/enums";

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  role: Role;
  phone?: string;
  profilePhoto?: string;
};

export type TLoginUser = {
  email: string;
  password: string;
};