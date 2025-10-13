export const ENV_CONFIG = {
  API_BASE_URL: 'https://api-gb-vowe.onrender.com',
  ENVIRONMENT: 'production',
  DEBUG: false,
  LOG_LEVEL: 'error',
  API_TIMEOUT: 15000,
} as const;

export type EnvConfig = typeof ENV_CONFIG;
