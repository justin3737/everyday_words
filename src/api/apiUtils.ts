import axios, { AxiosError } from 'axios';
import { getApiBaseUrl } from './utils';
import { getAuthHeaders } from '../utils/auth';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

interface ApiOptions {
  successMessage?: string;
  errorMessages?: {
    [key: number]: string;
    default: string;
  };
}

export const createApiRequest = (withAuth: boolean = true) => {
  const baseURL = getApiBaseUrl();
  const headers = withAuth ? getAuthHeaders() : undefined;
  
  return {
    get: async <T>(endpoint: string, options?: ApiOptions): Promise<T> => {
      try {
        const response = await axios.get<T>(`${baseURL}${endpoint}`, headers);
        return response.data;
      } catch (error) {
        throw handleApiError(error as AxiosError, options?.errorMessages);
      }
    },
    
    post: async <T, D = unknown>(
      endpoint: string, 
      data?: D, 
      options?: ApiOptions
    ): Promise<ApiResponse<T>> => {
      try {
        const response = await axios.post<T>(`${baseURL}${endpoint}`, data, headers);
        return {
          success: true,
          message: options?.successMessage || '操作成功',
          data: response.data
        };
      } catch (error) {
        throw handleApiError(error as AxiosError, options?.errorMessages);
      }
    },
    
    delete: async (endpoint: string, options?: ApiOptions): Promise<ApiResponse> => {
      try {
        await axios.delete(`${baseURL}${endpoint}`, headers);
        return {
          success: true,
          message: options?.successMessage || '操作成功'
        };
      } catch (error) {
        throw handleApiError(error as AxiosError, options?.errorMessages);
      }
    }
  };
};

const handleApiError = (error: AxiosError, errorMessages?: {
  [key: number]: string;
  default: string;
}) => {
  // 確保使用 number 類型的狀態碼
  const status = error.response?.status as number;
  const defaultError = '發生錯誤';
  
  if (!errorMessages) {
    return new Error(defaultError);
  }

  // 使用數字索引來匹配錯誤訊息
  const errorMessage = status && errorMessages[status]
    ? errorMessages[status]
    : errorMessages.default ?? defaultError;
    
  return new Error(errorMessage);
}; 