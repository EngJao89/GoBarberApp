export const ENV_CONFIG = {
  API_BASE_URL: 'http://192.168.100.11:3333',
  ENVIRONMENT: 'local',
  DEBUG: true,
  LOG_LEVEL: 'debug',
  API_TIMEOUT: 10000,
} as const;

export type EnvConfig = typeof ENV_CONFIG;
