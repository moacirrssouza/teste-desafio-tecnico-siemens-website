import type { AxiosInstance } from 'axios';
import { attachAuthInterceptor } from './api/interceptors/authInterceptor';
import { attachErrorInterceptor } from './api/interceptors/errorInterceptor';

export function registerInterceptors(client: AxiosInstance) {
  attachAuthInterceptor(client);
  attachErrorInterceptor(client);
}

