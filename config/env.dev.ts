export const ENV_CONFIG = {
  API_BASE_URL: 'https://api-gb-vowe.onrender.com',
  ENVIRONMENT: 'development',
  DEBUG: true,
  LOG_LEVEL: 'debug',
  API_TIMEOUT: 30000,
} as const;

export type EnvConfig = typeof ENV_CONFIG;
