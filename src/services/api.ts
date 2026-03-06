import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { env } from '../config/env';
import { registerInterceptors } from './interceptors';

const apiClient: AxiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

registerInterceptors(apiClient);

export default apiClient;

