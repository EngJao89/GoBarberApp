import Constants from 'expo-constants';

const DEV_CONFIG = {
  API_BASE_URL: 'https://api-gb-vowe.onrender.com',
  ENVIRONMENT: 'development',
  DEBUG: true,
  LOG_LEVEL: 'debug',
  API_TIMEOUT: 30000,
};

const PROD_CONFIG = {
  API_BASE_URL: 'https://api-gb-vowe.onrender.com',
  ENVIRONMENT: 'production',
  DEBUG: false,
  LOG_LEVEL: 'error',
  API_TIMEOUT: 15000,
};

const LOCAL_CONFIG = {
  API_BASE_URL: 'http://192.168.100.11:3333',
  ENVIRONMENT: 'local',
  DEBUG: true,
  LOG_LEVEL: 'debug',
  API_TIMEOUT: 10000,
};

if (typeof process !== 'undefined' && process.env && typeof require !== 'undefined') {
  try {
    const fs = require('fs');
    const path = require('path');
    const envFile = path.join(__dirname, '../.env');
    if (fs.existsSync(envFile)) {
      const envContent = fs.readFileSync(envFile, 'utf8');
      envContent.split('\n').forEach((line: string) => {
        const [key, value] = line.split('=');
        if (key && value) {
          process.env[key.trim()] = value.trim();
        }
      });
    }
  } catch (error) {}
}

const getEnvironment = () => {
  if (__DEV__ === false) {
    return 'production';
  }

  const customEnv = Constants.expoConfig?.extra?.environment || process.env.EXPO_PUBLIC_ENVIRONMENT;

  if (__DEV__) {
    console.log('🔍 Debug - customEnv detectado:', customEnv);
    console.log('🔍 Debug - Constants.expoConfig?.extra?.environment:', Constants.expoConfig?.extra?.environment);
    console.log('🔍 Debug - process.env.EXPO_PUBLIC_ENVIRONMENT:', process.env.EXPO_PUBLIC_ENVIRONMENT);
    console.log('🔍 Debug - Constants.expoConfig?.extra:', Constants.expoConfig?.extra);
  }
  
  if (customEnv === 'production') {
    return 'production';
  }
  
  if (customEnv === 'local') {
    return 'local';
  }

  return 'development';
};

const environment = getEnvironment();

let ENV_CONFIG: typeof DEV_CONFIG;
switch (environment) {
  case 'production':
    ENV_CONFIG = PROD_CONFIG;
    break;
  case 'local':
    ENV_CONFIG = LOCAL_CONFIG;
    break;
  default:
    ENV_CONFIG = DEV_CONFIG;
}

export { ENV_CONFIG };
export type EnvConfig = typeof ENV_CONFIG;

if (__DEV__) {
  console.log(`🔧 Ambiente: ${ENV_CONFIG.ENVIRONMENT}`);
  console.log(`🌐 API URL: ${ENV_CONFIG.API_BASE_URL}`);
  console.log(`🐛 Debug: ${ENV_CONFIG.DEBUG}`);
}
