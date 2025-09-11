import BaseError from "./BaseError";

class UnauthorizedError extends BaseError {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
  }
}

export default UnauthorizedError;
