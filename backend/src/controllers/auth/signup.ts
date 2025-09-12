import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "@/prisma";
import { signupSchema } from "@/validation/auth";
import { asyncCatcher } from "@/utils/asyncCatcher";

declare module "express-session" {
	interface SessionData {
		userId: string;
	}
}

export const signup = asyncCatcher(async (req: Request, res: Response) => {
	// ✅ 1. Validate input with Zod
	const { email, password, fullName, username, contactNumber } =
		signupSchema.parse(req.body);

	// ✅ 2. Hash password
	const hashedPassword = await bcrypt.hash(password, 10);

	// ✅ 3. Insert user (unique constraints handled by Prisma + errorHandler)
	const user = await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
			fullName,
			username,
			contactNumber,
			role: "ADMIN",
		},
	});

	// ✅ 4. Save session
	req.session.userId = user.id;

	// ✅ 5. Return response (no password leakage)
	const { password: _, ...userWithoutPassword } = user;
	res.status(201).json({
		message: "Signup successful",
		user: userWithoutPassword,
	});
});
