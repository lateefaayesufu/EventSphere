import { Request, Response } from "express";
import { asyncCatcher } from "@/utils/asyncCatcher";
import prisma from "@/prisma";
import { Role } from "@prisma/client";

export const getAllEvents = asyncCatcher(async (req: Request, res: Response) => {
  const { userId, role } = req.session;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  let where = {};
  if (role === Role.ORGANIZER) {
    where = { organizerId: userId };
  }

  const events = await prisma.event.findMany({
    where,
    skip,
    take: limit,
  });

  const totalEvents = await prisma.event.count({ where });

  res.status(200).json({
    message: "Events retrieved successfully",
    events,
    totalPages: Math.ceil(totalEvents / limit),
    currentPage: page,
  });
});
