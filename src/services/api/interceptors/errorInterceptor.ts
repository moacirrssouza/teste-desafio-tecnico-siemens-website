import type { AxiosInstance, AxiosError } from 'axios';
import type { ApiResponse } from '../../../@types';

export function attachErrorInterceptor(client: AxiosInstance) {
  client.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError<ApiResponse<unknown>>) => {
      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;
        switch (status) {
          case 401:
            localStorage.removeItem('authToken');
            window.location.href = '/login';
            break;
          case 403:
          case 404:
          case 500:
          default:
            console.error('API Error:', errorData);
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error:', error.message);
      }
      return Promise.reject(error);
    }
  );
}