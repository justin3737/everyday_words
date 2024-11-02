import axios from 'axios';
import { getApiBaseUrl } from './utils';

interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

/* 登入 API */
export const login = async (credentials: { email: string; password: string }): Promise<ApiResponse<{
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}>> => {
  const apiBaseUrl = getApiBaseUrl();
  try {
    const response = await axios.post<AuthResponse>(`${apiBaseUrl}/auth/login`, credentials);
    return {
      success: true,
      message: '登入成功',
      data: {
        token: response.data.token,
        user: response.data.user
      }
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || '登入失敗'
      };
    }
    return {
      success: false,
      message: '登入失敗'
    };
  }
};

/* 註冊 API */
export const register = async (data: RegisterData): Promise<ApiResponse<AuthResponse>> => {
  const apiBaseUrl = getApiBaseUrl();
  try {
    const response = await axios.post<AuthResponse>(
      `${apiBaseUrl}/auth/register`,
      data
    );
    return {
      success: true,
      message: '註冊成功',
      data: response.data
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 409) {
        return { success: false, message: '此信箱已被註冊' };
      }
    }
    throw error;
  }
};

export const getAuthHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});
