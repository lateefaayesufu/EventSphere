import { z } from "zod";

export const signupSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, "Password too short"),
	fullName: z.string().nonempty(),
	username: z.string().min(3, "Username too short").max(20, "Username too long").nonempty(),
	contactNumber: z.string().regex(/^\d{11}$/, "Invalid contact number"),
});

export const loginSchema = z.object({
	email: z.email("Please enter a valid email address"),
	password: z.string("Password is required"),
});
