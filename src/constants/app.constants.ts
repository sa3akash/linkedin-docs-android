export const APP_CONFIG = {
  APP_NAME: 'LinkedIn Enterprise',
  API_BASE_URL: 'https://api.linkedin-enterprise.com/v1',
  SOCKET_URL: 'https://socket.linkedin-enterprise.com',
  TIMEOUT_MS: 15000,
  RETRY_COUNT: 3,
  ITEMS_PER_PAGE: 10,
  TOKEN_REFRESH_THRESHOLD_SEC: 60,
  OFFLINE_QUEUE_MAX_SIZE: 100,
} as const;

export const SECURITY_CONFIG = {
  TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  BIOMETRIC_ENABLED_KEY: 'biometric_enabled',
} as const;
