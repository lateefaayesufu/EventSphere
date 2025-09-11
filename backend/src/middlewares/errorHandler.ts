import { NextFunction, Request, Response } from "express";
import BaseError from "@/utils/errors/BaseError";
import { ZodError } from "zod";

const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof BaseError) {
		return res.status(err.statusCode).json({ error: err.message });
	}

	if (err instanceof ZodError) {
		const flattenedErrors = err.flatten();
		const { formErrors, fieldErrors } = flattenedErrors;
		const errors = {
			...fieldErrors,
			...(formErrors.length > 0 && { form: formErrors }),
		};
		return res.status(400).json({ errors });
	}

	console.error(err);
	res.status(500).json({ error: "Internal Server Error" });
};

export default errorHandler;
