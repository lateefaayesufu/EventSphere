import { Request, Response } from "express";
import { asyncCatcher } from "@/utils/asyncCatcher";
import prisma from "@/prisma";

export const getUsers = asyncCatcher(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const users = await prisma.user.findMany({
    skip,
    take: limit,
    select: {
      id: true,
      fullName: true,
      email: true,
      username: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const totalUsers = await prisma.user.count();

  res.status(200).json({
    message: "Users retrieved successfully",
    users,
    totalPages: Math.ceil(totalUsers / limit),
    currentPage: page,
  });
});
