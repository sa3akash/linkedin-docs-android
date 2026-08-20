export const CONSTANTS = {
  PAGINATION_LIMIT: 20,
  MAX_UPLOAD_SIZE_BYTES: 100 * 1024 * 1024, // 100MB
  MIN_PASSWORD_LENGTH: 8,
  AUTO_SAVE_INTERVAL_MS: 3000,
  SOCKET_HEARTBEAT_MS: 25000,
  STORAGE_KEYS: {
    AUTH_TOKENS: 'auth_tokens_encrypted',
    THEME_MODE: 'theme_mode_preference',
    USER_SETTINGS: 'user_settings_data',
  },
};
