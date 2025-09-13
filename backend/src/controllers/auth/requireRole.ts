import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import { asyncCatcher } from "@/utils/asyncCatcher";
import UnauthorizedError from "@/utils/errors/UnauthorizedError";
import ForbiddenError from "@/utils/errors/ForbiddenError";
import prisma from "@/prisma";

declare module "express-serve-static-core" {
	interface Request {
		user?: {
			id: string;
			fullName: string;
			email: string;
			role: Role;
		};
	}
}

export const requireRole = (allowedRoles: Role[] = [Role.PARTICIPANT]) => {
	return asyncCatcher(
		async (req: Request, res: Response, next: NextFunction) => {
			const { userId } = req.session;
			console.log("Session userId:", userId);

			if (!userId) {
				throw new UnauthorizedError(
					"Authentication required to access this resource"
				);
			}

			const user = await prisma.user.findUnique({
				where: { id: userId },
				select: { id: true, fullName: true, email: true, role: true },
			});

			console.log(user);

			if (!user) {
				// If user was deleted but session persists
				req.session.destroy((err) => {
					if (err) return next(err);
				});
				throw new UnauthorizedError("Invalid session. Please log in again.");
			}

			if (!allowedRoles.includes(user.role)) {
				throw new ForbiddenError("You do not have the necessary permissions.");
			}

			// ✅ Attach user to req so downstream handlers can use it
			req.user = user;

			next();
		}
	);
};
