import { Request, Response } from "express";
import { asyncCatcher } from "@/utils/asyncCatcher";
import prisma from "@/prisma";
import { EventStatus } from "@prisma/client";

export const getEvents = asyncCatcher(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const events = await prisma.event.findMany({
    where: {
      status: EventStatus.APPROVED,
    },
    skip,
    take: limit,
  });

  const totalEvents = await prisma.event.count({
    where: {
      status: EventStatus.APPROVED,
    },
  });

  res.status(200).json({
    message: "Events retrieved successfully",
    events,
    totalPages: Math.ceil(totalEvents / limit),
    currentPage: page,
  });
});
