import { UserProfile } from './user.types';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthSession {
  user: UserProfile;
  tokens: AuthTokens;
  isAuthenticated: boolean;
  isBiometricAuthenticated: boolean;
}

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export interface OTPVerificationPayload {
  email: string;
  otpCode: string;
}
