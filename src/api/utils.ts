/* 獲取API基礎URL */
export const getApiBaseUrl = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3700';
  if (!apiBaseUrl) {
    throw new Error('API base URL is not defined');
  }
  return apiBaseUrl;
}; 