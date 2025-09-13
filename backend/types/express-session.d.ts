import { Role } from "@prisma/client";

declare module "express-session" {
  interface SessionData {
    userId: string;
    role: Role;
  }
}

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        fullName: string;
        email: string;
        role: Role;
      };
    }
  }
}
