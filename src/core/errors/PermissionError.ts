import { BaseAppError } from './UnknownError';

export class PermissionError extends BaseAppError {
  public readonly code = 'PERMISSION_ERROR';
  public readonly statusCode = 403;

  constructor(message = 'Required permission was denied by device or system', originalError?: unknown) {
    super(message, originalError);
  }
}
