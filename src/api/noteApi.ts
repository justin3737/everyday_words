import axios from 'axios';
import { VocabularyItem, VocabularyResponse } from '../types/vocabulary';
import { getApiBaseUrl } from './utils';
import { getAuthHeaders } from '../utils/auth';

/* 新增筆記 */
export const addNote = async (word: VocabularyItem): Promise<{ success: boolean; message: string }> => {
  const apiBaseUrl = getApiBaseUrl();
  try {
    await axios.post(`${apiBaseUrl}/api/notes`, word, getAuthHeaders());
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
  const response = await axios.get<VocabularyResponse>(
    `${apiBaseUrl}/api/notes`,
    getAuthHeaders()
  );
  if (response.data && Array.isArray(response.data.content)) {
    return response.data.content;
  }
  throw new Error('無法獲取筆記');
};

/* 刪除筆記 */
export const deleteNote = async (word: string): Promise<{ success: boolean; message: string }> => {
  const apiBaseUrl = getApiBaseUrl();
  try {
    await axios.delete(
      `${apiBaseUrl}/api/notes/${word}`,
      getAuthHeaders()
    );
    return { success: true, message: '刪除筆記成功' };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 444) {
        return { success: false, message: '刪除筆記失敗, 筆記不存在' };
    }
    throw error;
  }
}; 