import axios from 'axios'
// import { ENV_CONFIG, type EnvConfig } from '@/config';
import { ENV_CONFIG, type EnvConfig } from '@/config/force-local';

const api = axios.create({
  baseURL: ENV_CONFIG.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: ENV_CONFIG.API_TIMEOUT,
});

api.interceptors.request.use(
  (config) => {
    console.log('🚀 Requisição:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', error.response?.status, error.response?.data, error.message);
    return Promise.reject(error);
  }
);

export default api;
