export abstract class BaseAppError extends Error {
  public abstract readonly code: string;
  public abstract readonly statusCode: number;

  constructor(message: string, public readonly originalError?: unknown) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class UnknownError extends BaseAppError {
  public readonly code = 'UNKNOWN_ERROR';
  public readonly statusCode = 500;

  constructor(message = 'An unexpected unknown error occurred', originalError?: unknown) {
    super(message, originalError);
  }
}
