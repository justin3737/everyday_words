import axios from 'axios';
import { VocabularyItem, VocabularyResponse } from '../types/vocabulary';


/* 獲取API基礎URL */
const getApiBaseUrl = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3700';
  if (!apiBaseUrl) {
    throw new Error('API base URL is not defined');
  }
  return apiBaseUrl;
};

/* 獲取詞彙 */
export const fetchVocabulary = async (): Promise<VocabularyItem[]> => {
  const apiBaseUrl = getApiBaseUrl();
  const response = await axios.get<VocabularyResponse>(`${apiBaseUrl}/api/vocabulary`);
  if (response.data && Array.isArray(response.data.content)) {
    return response.data.content;
  } else {
    console.error('Unexpected response format:', response.data);
    return [];
  }
};
/* 新增筆記 */
export const addNote = async (word: VocabularyItem): Promise<{ success: boolean; message: string }> => {
  const apiBaseUrl = getApiBaseUrl();
  try {
    await axios.post(`${apiBaseUrl}/api/addNote`, word);
    return { success: true, message: '加入筆記成功' };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      return { success: false, message: '已加入過筆記' };
    }
    throw error;
  }
};

/* 獲取筆記 */
export const fetchNotes = async (): Promise<VocabularyItem[]> => {
  const apiBaseUrl = getApiBaseUrl();
  const response = await axios.get<VocabularyResponse>(`${apiBaseUrl}/api/notes`);
  if (response.data && Array.isArray(response.data.content)) {
    return response.data.content;
  } else {
    console.error('Unexpected response format:', response.data);
    return [];
  }
};
