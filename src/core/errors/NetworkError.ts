import { BaseAppError } from './UnknownError';

export class NetworkError extends BaseAppError {
  public readonly code = 'NETWORK_ERROR';
  public readonly statusCode = 0;

  constructor(message = 'Network connection unavailable. Please check your internet.', originalError?: unknown) {
    super(message, originalError);
  }
}
