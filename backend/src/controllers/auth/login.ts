import { Request, Response } from "express";
import { asyncCatcher } from "@/utils/asyncCatcher";
import { loginSchema } from "@/validation/auth";
import prisma from "@/prisma";
import BadRequestError from "@/utils/errors/BadRequestError";
import bcrypt from "bcrypt";

export const login = asyncCatcher(async (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new BadRequestError("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new BadRequestError("Invalid credentials");
  }

  req.session.userId = user.id;
  req.session.role = user.role;

  const { password: _, ...userWithoutPassword } = user;

  res.status(200).json({ message: "Login successful", user: userWithoutPassword });
});
