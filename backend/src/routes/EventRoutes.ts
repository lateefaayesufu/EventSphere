import { Router } from "express";
import { Role } from "@prisma/client";
import { requireRole } from "@/controllers/auth";
import { createEvent } from "@/controllers/events";

const router = Router();

router.post(
  "/create",
  requireRole([Role.ORGANIZER, Role.ADMIN]),
  createEvent
);

export default router;
