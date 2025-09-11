import BaseError from "./BaseError";

class ForbiddenError extends BaseError {
  constructor(message: string = "Forbidden") {
    super(message, 403);
  }
}

export default ForbiddenError;
