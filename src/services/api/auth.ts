import { apiClient } from './axios';
import {
  ApiResponse,
  AuthTokens,
  DeviceSession,
  ForgotPasswordPayload,
  LoginPayload,
  OtpPayload,
  RegisterPayload,
} from './types';
import { UserProfile } from '../../types/user.types';

export interface AuthResponseData {
  user: UserProfile;
  tokens: AuthTokens;
}

export const authApi = {
  login: async (payload: LoginPayload): Promise<ApiResponse<AuthResponseData>> => {
    const response = await apiClient.post<ApiResponse<AuthResponseData>>('/auth/login', payload);
    return response.data;
  },

  register: async (payload: RegisterPayload): Promise<ApiResponse<AuthResponseData>> => {
    const response = await apiClient.post<ApiResponse<AuthResponseData>>('/auth/register', payload);
    return response.data;
  },

  sendOtp: async (email: string, purpose: OtpPayload['purpose']): Promise<ApiResponse<{ sent: boolean }>> => {
    const response = await apiClient.post<ApiResponse<{ sent: boolean }>>('/auth/otp/send', { email, purpose });
    return response.data;
  },

  verifyOtp: async (payload: OtpPayload): Promise<ApiResponse<{ verified: boolean }>> => {
    const response = await apiClient.post<ApiResponse<{ verified: boolean }>>('/auth/otp/verify', payload);
    return response.data;
  },

  forgotPassword: async (payload: ForgotPasswordPayload): Promise<ApiResponse<{ reset: boolean }>> => {
    const response = await apiClient.post<ApiResponse<{ reset: boolean }>>('/auth/forgot-password', payload);
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<AuthTokens>> => {
    const response = await apiClient.post<ApiResponse<AuthTokens>>('/auth/refresh', { refreshToken });
    return response.data;
  },

  getSessions: async (): Promise<ApiResponse<DeviceSession[]>> => {
    const response = await apiClient.get<ApiResponse<DeviceSession[]>>('/auth/sessions');
    return response.data;
  },

  revokeSession: async (sessionId: string): Promise<ApiResponse<{ revoked: boolean }>> => {
    const response = await apiClient.delete<ApiResponse<{ revoked: boolean }>>(`/auth/sessions/${sessionId}`);
    return response.data;
  },
};
