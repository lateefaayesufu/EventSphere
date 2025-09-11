class BaseError extends Error {
	public statusCode: number;
	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

export default BaseError;
