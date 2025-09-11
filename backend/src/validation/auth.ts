import { z } from "zod";

export const signupSchema = z.object({
	email: z.email(),
	password: z.string().min(8, "Password too short"),
	fullName: z.string().nonempty(),
});

export const loginSchema = z.object({
	email: z.email("Please enter a valid email address"),
	password: z.string("Password is required"),
});
