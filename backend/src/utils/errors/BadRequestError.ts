import BaseError from "@/utils/errors/BaseError";

class BadRequestError extends BaseError {
	constructor(message: string) {
		super(message, 400);
	}
}

export default BadRequestError;
