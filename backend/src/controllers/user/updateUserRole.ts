import { Request, Response } from "express";
import { asyncCatcher } from "@/utils/asyncCatcher";
import prisma from "@/prisma";
import { updateUserRoleSchema } from "@/validation/user";
import BadRequestError from "@/utils/errors/BadRequestError";

export const updateUserRole = asyncCatcher(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = updateUserRoleSchema.parse(req.body);

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new BadRequestError("User not found");
  }

  if (role === "ADMIN") {
    throw new BadRequestError("Cannot change user role to ADMIN");
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { role },
  });

  res.status(200).json({ message: "User role updated successfully", user: updatedUser });
});
