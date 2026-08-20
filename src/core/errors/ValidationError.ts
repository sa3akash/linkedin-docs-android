import { BaseAppError } from './UnknownError';

export class ValidationError extends BaseAppError {
  public readonly code = 'VALIDATION_ERROR';
  public readonly statusCode = 422;

  constructor(message: string, public readonly fields?: Record<string, string>, originalError?: unknown) {
    super(message, originalError);
  }
}
