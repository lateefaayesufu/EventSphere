import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { signupSchema } from "@/validation/auth";
import { asyncCatcher } from "@/utils/asyncCatcher";
import BadRequestError from "@/utils/errors/BadRequestError";
import prisma from "@/prisma";

declare module "express-session" {
	interface SessionData {
		userId: string;
	}
}

export const signup = asyncCatcher(async (req: Request, res: Response) => {
	const { email, password, fullName } = signupSchema.parse(req.body);

	const existingUser = await prisma.user.findUnique({ where: { email } });
	if (existingUser) {
		throw new BadRequestError("Email already in use");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
			fullName,
			role: "PARTICIPANT",
		},
	});

	req.session.userId = user.id;

  const { password: _, ...userWithoutPassword } = user;

	res.status(201).json({ message: "Signup successful", user: userWithoutPassword });
});
