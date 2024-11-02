import axios from 'axios';
import { VocabularyItem } from '../types/vocabulary';
import { getApiBaseUrl } from './utils';
import { getAuthHeaders } from '../utils/auth';

/* 獲取隨機10個單字 */
export const fetchVocabulary = async (): Promise<VocabularyItem[]> => {
  const apiBaseUrl = getApiBaseUrl();
  const response = await axios.get<VocabularyItem[]>(
    `${apiBaseUrl}/api/vocabulary`,
    getAuthHeaders()
  );
  if (response.data && Array.isArray(response.data)) {
    return response.data;
  } else {
    console.error('Unexpected response format:', response.data);
    return [];
  }
};

/* 獲取1個單字 */
export const fetchVocabularyByWord = async (word: string): Promise<VocabularyItem> => {
    const apiBaseUrl = getApiBaseUrl();
    const response = await axios.get<VocabularyItem>(
      `${apiBaseUrl}/api/vocabulary/${word}`,
      getAuthHeaders()
    );
    if (response.data) {
      return response.data;
    } else {
      console.error('Unexpected response format:', response.data);
      return {} as VocabularyItem; // 返回空的 VocabularyItem 物件
    }
  };
