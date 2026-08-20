import axios, { AxiosInstance } from 'axios';
import { APP_CONFIG } from '../../constants/app.constants';

export const apiClient: AxiosInstance = axios.create({
  baseURL: APP_CONFIG.API_BASE_URL,
  timeout: APP_CONFIG.TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
