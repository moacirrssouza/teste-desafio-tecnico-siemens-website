import { environment } from './environments/environment';

export const API_CONFIG = {
  baseUrl: environment.API_BASE_URL,
};

export const ENDPOINTS = {
  books: '/v1/Books',
} as const;