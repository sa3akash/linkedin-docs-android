/**
 * Enterprise Custom Error Hierarchy
 * Strongly typed error definitions enforcing clean error classification and global mapping.
 */

export abstract class BaseAppError extends Error {
  public abstract readonly code: string;
  public abstract readonly statusCode: number;

  constructor(message: string, public readonly originalError?: unknown) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ApiError extends BaseAppError {
  public readonly code = 'API_ERROR';
  constructor(message: string, public readonly statusCode = 500, originalError?: unknown) {
    super(message, originalError);
  }
}

export class AuthError extends BaseAppError {
  public readonly code = 'AUTH_ERROR';
  public readonly statusCode = 401;
  constructor(message = 'Authentication failed or token expired', originalError?: unknown) {
    super(message, originalError);
  }
}

export class ValidationError extends BaseAppError {
  public readonly code = 'VALIDATION_ERROR';
  public readonly statusCode = 400;
  constructor(message: string, public readonly fieldErrors?: Record<string, string[]>) {
    super(message);
  }
}

export class PermissionError extends BaseAppError {
  public readonly code = 'PERMISSION_DENIED';
  public readonly statusCode = 403;
  constructor(public readonly permissionName: string) {
    super(`Permission denied for: ${permissionName}`);
  }
}

export class NetworkError extends BaseAppError {
  public readonly code = 'NETWORK_OFFLINE';
  public readonly statusCode = 0;
  constructor(message = 'Network connection unavailable') {
    super(message);
  }
}

export const mapUnknownToAppError = (error: unknown): BaseAppError => {
  if (error instanceof BaseAppError) {
    return error;
  }
  if (error instanceof Error) {
    return new ApiError(error.message, 500, error);
  }
  return new ApiError('An unexpected error occurred', 500, error);
};
