import { BaseAppError } from './UnknownError';

export class ApiError extends BaseAppError {
  public readonly code = 'API_ERROR';

  constructor(message: string, public readonly statusCode = 500, originalError?: unknown) {
    super(message, originalError);
  }
}
