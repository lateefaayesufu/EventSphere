import { Router } from "express";
import { Role } from "@prisma/client";
import { requireRole } from "@/controllers/auth";
import { createEvent, getEvents, approveEvent, rejectEvent } from "@/controllers/events";

const router = Router();

router.get("/", getEvents);

router.post("/create", requireRole([Role.ORGANIZER, Role.ADMIN]), createEvent);

router.patch(
  "/:id/approve",
  requireRole([Role.ADMIN]),
  approveEvent
);

router.patch(
  "/:id/reject",
  requireRole([Role.ADMIN]),
  rejectEvent
);

export default router;
