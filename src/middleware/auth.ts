import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import config from "../config";
import { prisma } from "../lib/prisma";
import { jwtUtils } from "../utils/jwt";
import { catchAsync } from "../utils/catchAsync";
import { Role } from "../../prisma/generated/prisma/enums";

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: Role;
      };
    }
  }
}

export {};

const auth = (...requiredRoles: Role[]) => {
  return catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // Get Access Token from Cookie or Authorization Header
      const token =
        req.cookies?.accessToken ??
        req.headers.authorization?.split(" ")[1];

      // Check Token
      if (!token) {
        throw new Error(
          "You are not logged in. Please login to access this resource."
        );
      }

      // Verify Token
      const verified = jwtUtils.verifyToken(
        token,
        config.jwt_access_secret
      );

      if (!verified.success) {
        throw new Error(verified.error);
      }

      // Extract Payload
      const decoded = verified.data as JwtPayload;

      const { id, email, role } = decoded;

      // Role Authorization
      if (
        requiredRoles.length > 0 &&
        !requiredRoles.includes(role)
      ) {
        throw new Error(
          "Forbidden. You don't have permission to access this resource."
        );
      }

      // Check User Exists
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new Error("User not found.");
      }

      // Check User Status
      if (user.status !== "ACTIVE") {
        throw new Error("User is not active.");
      }

      // Attach User Information to Request
      req.user = {
        id,
        email,
        role,
      };

      next();
    }
  );
};

export default auth;