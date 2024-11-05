import { createApiRequest } from './apiUtils';
import { VocabularyItem } from '../types/vocabulary';

const api = createApiRequest(true);

export const fetchVocabulary = async (): Promise<VocabularyItem[]> => {
  return api.get('/api/vocabulary', {
    errorMessages: {
      401: '請先登入',
      default: '獲取單字列表失敗'
    }
  });
};

export const fetchVocabularyByWord = async (word: string): Promise<VocabularyItem> => {
  return api.get(`/api/vocabulary/${word}`, {
    errorMessages: {
      404: '找不到此單字',
      default: '獲取單字資訊失敗'
    }
  });
};
