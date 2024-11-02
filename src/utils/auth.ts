// Token 相關的工具函數
export const TOKEN_KEY = 'auth_token';

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// 創建帶有認證 header 的 axios 配置
export const getAuthHeaders = () => {
  const token = getToken();
  return token ? {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  } : {};
}; 