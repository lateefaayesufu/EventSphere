import { Request, Response } from "express";
import { asyncCatcher } from "@/utils/asyncCatcher";
import { createEventSchema } from "@/validation";
import prisma from "@/prisma";
import { EventStatus } from "@prisma/client";

export const createEvent = asyncCatcher(async (req: Request, res: Response) => {
	const { userId } = req.session;

	// This check should ideally be handled by requireRole, but good for type safety
	if (!userId) {
		return res
			.status(401)
			.json({ message: "Unauthorized: User ID not found in session." });
	}

	const eventData = createEventSchema.parse(req.body);

	const newEvent = await prisma.event.create({
		data: {
			...eventData,
			organizerId: userId,
			status: EventStatus.PENDING, // Default status as per requirement
			date: new Date(eventData.date), // Convert date string to Date object
		},
	});

	res
		.status(201)
		.json({ message: "Event created successfully", event: newEvent });
});
