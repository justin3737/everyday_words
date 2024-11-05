import { ApiResponse, createApiRequest } from './apiUtils';
import { VocabularyItem } from '../types/vocabulary';

const api = createApiRequest(true);

/* 新增筆記 */
export const addNote = async (word: VocabularyItem): Promise<ApiResponse<VocabularyItem>> => {
  return api.post('/api/notes', word, {
    successMessage: '加入筆記成功',
    errorMessages: {
      409: '已加入過筆記',
      default: '加入筆記失敗'
    }
  });
};

/* 獲取筆記 */
export const fetchNotes = async (): Promise<ApiResponse<VocabularyItem[]>> => {
  return api.get('/api/notes', {
    errorMessages: {
      default: '無法獲取筆記'
    }
  });
};

/* 刪除筆記 */
export const deleteNote = async (word: string): Promise<ApiResponse<unknown>> => {
  return api.delete(`/api/notes/${word}`, {
    successMessage: '刪除筆記成功',
    errorMessages: {
      444: '刪除筆記失敗, 筆記不存在',
      default: '刪除筆記失敗'
    }
  });
}; 