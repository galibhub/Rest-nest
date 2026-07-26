import { SignOptions } from "jsonwebtoken";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utils/jwt";
import { TLoginUser, TRegisterUser } from "./auth.interface";
import bcrypt from "bcryptjs";

//create user
const registerUserIntoDB = async (payload: TRegisterUser) => {
  const { name, email, password, phone, role, profilePhoto } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExist) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
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

//login user

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User does not exist");
  }

  // Check Password
  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }

   //login jwt token
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in
  )

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in,
  );

   return {
    accessToken,
    refreshToken
   }
};



export const authService = {
  registerUserIntoDB,loginUser,
};
