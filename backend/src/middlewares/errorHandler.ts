import { NextFunction, Request, Response } from "express";
import BaseError from "@/utils/errors/BaseError";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// Custom domain errors
	if (err instanceof BaseError) {
		return res.status(err.statusCode).json({ error: err.message });
	}

	// Zod validation errors
	if (err instanceof ZodError) {
		const { formErrors, fieldErrors } = err.flatten();
		const errors = {
			...fieldErrors,
			...(formErrors.length > 0 && { form: formErrors }),
		};
		return res.status(400).json({ errors });
	}

	// Prisma errors
	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		if (err.code === "P2002") {
			// Unique constraint failed
			return res.status(400).json({
				error: `${(err.meta?.target as string[])?.join(", ")} already in use`,
			});
		}
		if (err.code === "P2003") {
			// Foreign key constraint failed
			return res.status(400).json({
				error: "Invalid reference — related record does not exist",
			});
		}
		// Other Prisma known errors
		console.log(err);

		return res.status(400).json({ error: "Database request error" });
	}

	if (err instanceof Prisma.PrismaClientValidationError) {
		return res.status(400).json({ error: "Invalid data sent to database" });
	}

	// Fallback
	console.error(err);
	res.status(500).json({ error: "Internal Server Error" });
};

export default errorHandler;
