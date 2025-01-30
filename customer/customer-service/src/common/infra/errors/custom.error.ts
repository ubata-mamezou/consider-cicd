import { ErrorMessage } from "./error-message.dto";

export class CustomError extends Error {
  constructor(
    readonly message: string,
    readonly details?: ErrorMessage[],
    readonly cause?: unknown,
  ) {
    super(message);
    this.cause = cause;
    this.details = details;
  }

}