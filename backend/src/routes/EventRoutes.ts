import { Router } from "express";
import { Role } from "@prisma/client";
import { requireRole } from "@/controllers/auth";
import { createEvent, getApprovedEvents, approveEvent, rejectEvent, editEvent, getAllEvents } from "@/controllers/events";

const router = Router();

router.get("/", getApprovedEvents);
router.get("/all", requireRole([Role.ORGANIZER, Role.ADMIN]), getAllEvents);

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

router.patch(
  "/:id",
  requireRole([Role.ORGANIZER, Role.ADMIN]),
  editEvent
);

export default router;
