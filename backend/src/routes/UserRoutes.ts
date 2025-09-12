import { Router } from "express";
import { Role } from "@prisma/client";
import { requireRole } from "@/controllers/auth";
import { getUsers, updateUserRole } from "@/controllers/user";

const router = Router();

router.get("/", requireRole([Role.ADMIN]), getUsers);
router.patch("/:id/role", requireRole([Role.ADMIN]), updateUserRole);

export default router;
