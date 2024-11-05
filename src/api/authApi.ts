import { createApiRequest } from './apiUtils';
import { ApiResponse } from './apiUtils';

const api = createApiRequest(false);

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export const login = async (credentials: { email: string; password: string }): Promise<ApiResponse<{ token: string }>> => {
  return api.post('/auth/login', credentials, {
    successMessage: '登入成功',
    errorMessages: {
      401: '帳號或密碼錯誤',
      default: '登入失敗'
    }
  });
};

export const register = async (data: RegisterData) => {
  return api.post('/auth/register', data, {
    successMessage: '註冊成功',
    errorMessages: {
      409: '此信箱已被註冊',
      default: '註冊失敗'
    }
  });
};