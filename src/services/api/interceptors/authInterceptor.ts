import type { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios';

export function attachAuthInterceptor(client: AxiosInstance) {
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const headers = (config.headers ?? {}) as AxiosRequestHeaders;
      headers.Authorization = `Bearer ${token}`;
      config.headers = headers;
    }
    return config;
  });
}