export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  code?: string;
  errors?: Record<string, string[]>;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface DeviceSession {
  id: string;
  deviceName: string;
  platform: 'ios' | 'android' | 'web';
  lastActive: string;
  ipAddress: string;
  isCurrent: boolean;
}

export interface LoginPayload {
  email: string;
  password?: string;
  otp?: string;
  deviceId?: string;
  deviceName?: string;
}

export interface RegisterPayload {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  headline?: string;
}

export interface OtpPayload {
  email: string;
  code: string;
  purpose: 'LOGIN' | 'REGISTER' | 'FORGOT_PASSWORD';
}

export interface ForgotPasswordPayload {
  email: string;
  newPassword?: string;
  otpCode?: string;
}
