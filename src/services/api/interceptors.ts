import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { apiClient } from './axios';
import { mmkvStorage } from '../storage/mmkv.storage';
import { SECURITY_CONFIG } from '../../constants/app.constants';

interface PendingRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: PendingRequest[] = [];

const processQueue = (error: unknown, token: string | null = null): void => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

export const setupInterceptors = (onLogout: () => void): void => {
  // Request Interceptor: Attach JWT Token
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = mmkvStorage.getItem(SECURITY_CONFIG.TOKEN_KEY);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // Response Interceptor: Handle Refresh Token & Errors
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return apiClient(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = mmkvStorage.getItem(SECURITY_CONFIG.REFRESH_TOKEN_KEY);
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          // Trigger token refresh endpoint
          const response = await apiClient.post<{ accessToken: string; refreshToken: string }>(
            '/auth/refresh',
            { refreshToken }
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data;
          mmkvStorage.setItem(SECURITY_CONFIG.TOKEN_KEY, accessToken);
          mmkvStorage.setItem(SECURITY_CONFIG.REFRESH_TOKEN_KEY, newRefreshToken);

          processQueue(null, accessToken);
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          return apiClient(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          mmkvStorage.removeItem(SECURITY_CONFIG.TOKEN_KEY);
          mmkvStorage.removeItem(SECURITY_CONFIG.REFRESH_TOKEN_KEY);
          onLogout();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
