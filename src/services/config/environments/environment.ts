export const environment = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7173/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Sistema de gerenciamento de biblioteca',
  LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL || 'info',
  ENV: import.meta.env.MODE || 'development',
};