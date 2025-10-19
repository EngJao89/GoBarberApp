#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ENV_FILE = path.join(__dirname, '../.env');
const ENV_LOCAL_FILE = path.join(__dirname, '../.env.local');

const environments = {
  dev: {
    NODE_ENV: 'development',
    EXPO_PUBLIC_ENVIRONMENT: 'development',
    EXPO_PUBLIC_API_URL: 'https://api-gb-vowe.onrender.com',
    EXPO_PUBLIC_DEBUG: 'true',
  },
  prod: {
    NODE_ENV: 'production',
    EXPO_PUBLIC_ENVIRONMENT: 'production',
    EXPO_PUBLIC_API_URL: 'https://api-gb-vowe.onrender.com',
    EXPO_PUBLIC_DEBUG: 'false',
  },
  local: {
    NODE_ENV: 'development',
    EXPO_PUBLIC_ENVIRONMENT: 'local',
    EXPO_PUBLIC_API_URL: 'http://192.168.100.11:3333',
    EXPO_PUBLIC_DEBUG: 'true',
  }
};

function createEnvFile(env) {
  const config = environments[env];
  if (!config) {
    console.error('❌ Ambiente inválido. Use: dev, prod ou local');
    process.exit(1);
  }

  const envContent = Object.entries(config)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  fs.writeFileSync(ENV_FILE, envContent);
  fs.writeFileSync(ENV_LOCAL_FILE, envContent);
}

const env = process.argv[2];

if (!env || !environments[env]) {
  process.exit(1);
}

createEnvFile(env);
