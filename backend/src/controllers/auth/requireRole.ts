import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import { asyncCatcher } from "@/utils/asyncCatcher";
import UnauthorizedError from "@/utils/errors/UnauthorizedError";
import ForbiddenError from "@/utils/errors/ForbiddenError";
import prisma from "@/prisma";

export const requireRole = (allowedRoles: Role[] = [Role.PARTICIPANT]) => {
  return asyncCatcher(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.session;

    if (!userId) {
      throw new UnauthorizedError("Authentication required to access this resource");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      // This could happen if the user was deleted but the session persists
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
      });
      throw new UnauthorizedError("Invalid session. Please log in again.");
    }

    if (!allowedRoles.includes(user.role)) {
      throw new ForbiddenError("You do not have the necessary permissions to perform this action.");
    }

    next();
  });
};
