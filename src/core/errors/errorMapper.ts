import { BaseAppError, UnknownError } from './UnknownError';
import { ApiError } from './ApiError';
import { AuthError } from './AuthError';
import { ValidationError } from './ValidationError';
import { PermissionError } from './PermissionError';
import { NetworkError } from './NetworkError';

export function mapUnknownToAppError(error: unknown): BaseAppError {
  if (error instanceof BaseAppError) {
    return error;
  }

  if (typeof error === 'object' && error !== null) {
    const errObj = error as Record<string, unknown>;

    // Network & Permission Error Checks
    if (errObj.isAxiosError || errObj.message === 'Network Error') {
      return new NetworkError('Network connection unreachable', error);
    }

    if (typeof errObj.message === 'string' && errObj.message.toLowerCase().includes('permission')) {
      return new PermissionError(errObj.message, error);
    }

    if (typeof errObj.status === 'number' || typeof errObj.statusCode === 'number') {
      const code = (errObj.status || errObj.statusCode) as number;
      const message = (errObj.message as string) || 'API Request Failed';

      if (code === 401) {
        return new AuthError(message, error);
      }
      if (code === 403) {
        return new PermissionError(message, error);
      }
      if (code === 422) {
        return new ValidationError(message, errObj.errors as Record<string, string>, error);
      }
      return new ApiError(message, code, error);
    }

    if (typeof errObj.message === 'string') {
      return new UnknownError(errObj.message, error);
    }
  }

  if (typeof error === 'string') {
    return new UnknownError(error);
  }

  return new UnknownError('An unexpected unknown error occurred', error);
}
