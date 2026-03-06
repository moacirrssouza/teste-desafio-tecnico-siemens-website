export type AppEnv = {
  API_BASE_URL: string;
  APP_NAME: string;
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
  ENV: 'development' | 'production' | 'test';
};

function getString(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback;
}

function toLogLevel(value: unknown): AppEnv['LOG_LEVEL'] {
  const v = typeof value === 'string' ? value.toLowerCase() : '';
  return v === 'debug' || v === 'info' || v === 'warn' || v === 'error' ? (v as AppEnv['LOG_LEVEL']) : 'info';
}

function toEnv(value: unknown): AppEnv['ENV'] {
  const v = typeof value === 'string' ? value.toLowerCase() : '';
  return v === 'development' || v === 'production' || v === 'test' ? (v as AppEnv['ENV']) : 'development';
}

const raw = import.meta.env;

export const env: AppEnv = {
  API_BASE_URL: getString(raw.VITE_API_BASE_URL, 'https://localhost:7173/api'),
  APP_NAME: getString(raw.VITE_APP_NAME, 'Library Management System'),
  LOG_LEVEL: toLogLevel(raw.VITE_LOG_LEVEL),
  ENV: toEnv(raw.MODE),
};

