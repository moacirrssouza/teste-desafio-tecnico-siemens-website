export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp?: Date;
  statusCode?: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  success: false;
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
  timestamp: Date;
}

