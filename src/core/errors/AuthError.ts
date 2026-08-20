import { BaseAppError } from './UnknownError';

export class AuthError extends BaseAppError {
  public readonly code = 'AUTH_ERROR';
  public readonly statusCode = 401;

  constructor(message = 'Authentication failed or token expired', originalError?: unknown) {
    super(message, originalError);
  }
}
