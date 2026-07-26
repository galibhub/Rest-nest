
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { TRegisterUser } from "./auth.interface";
import bcrypt from "bcryptjs";

const registerUserIntoDB = async (payload: TRegisterUser) => {
  const {
    name,
    email,
    password,
    phone,
    role,
    profilePhoto,
  } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExist) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
      role,

      profile: {
        create: {
          profilePhoto,
        },
      },
    },
    include: {
      profile: true,
    },
    omit: {
      password: true,
    },
  });

  return user;
};

export const authService = {
  registerUserIntoDB,
};