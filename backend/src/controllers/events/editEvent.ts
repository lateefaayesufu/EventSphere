import { Request, Response } from "express";
import { asyncCatcher } from "@/utils/asyncCatcher";
import prisma from "@/prisma";
import { editEventSchema } from "@/validation/event";
import BadRequestError from "@/utils/errors/BadRequestError";
import ForbiddenError from "@/utils/errors/ForbiddenError";
import { Role } from "@prisma/client";

export const editEvent = asyncCatcher(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, role } = req.session;

  if (!userId) {
    throw new ForbiddenError("Authentication required");
  }

  const eventData = editEventSchema.parse(req.body);

  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    throw new BadRequestError("Event not found");
  }

  if (role !== Role.ADMIN && event.organizerId !== userId) {
    throw new ForbiddenError("You are not authorized to edit this event");
  }

  const updatedEvent = await prisma.event.update({
    where: { id },
    data: eventData,
  });

  res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
});
