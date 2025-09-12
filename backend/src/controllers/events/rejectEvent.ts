import { Request, Response } from "express";
import { asyncCatcher } from "@/utils/asyncCatcher";
import prisma from "@/prisma";
import { EventStatus } from "@prisma/client";
import BadRequestError from "@/utils/errors/BadRequestError";

export const rejectEvent = asyncCatcher(async (req: Request, res: Response) => {
  const { id } = req.params;

  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    throw new BadRequestError("Event not found");
  }

  const updatedEvent = await prisma.event.update({
    where: { id },
    data: { status: EventStatus.REJECTED },
  });

  res.status(200).json({ message: "Event rejected successfully", event: updatedEvent });
});
