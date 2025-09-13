import { Router } from "express";
import { signup, login, checkAuth, requireRole } from "../controllers/auth";
import { Role } from "@prisma/client";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get(
	"/check",
	requireRole([Role.ADMIN, Role.ORGANIZER, Role.PARTICIPANT]),
	checkAuth
);

export default router;
