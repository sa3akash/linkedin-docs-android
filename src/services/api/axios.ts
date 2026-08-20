import axios, { AxiosInstance } from 'axios';
import { Platform } from 'react-native';
import { APP_CONFIG } from '../../constants/app.constants';

export const apiClient: AxiosInstance = axios.create({
  baseURL: APP_CONFIG.API_BASE_URL,
  timeout: APP_CONFIG.TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Client-Platform': Platform.OS,
    'X-App-Version': APP_CONFIG.VERSION || '1.0.0',
  },
});

