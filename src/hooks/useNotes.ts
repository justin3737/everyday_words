import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../api/noteApi';
import { VocabularyItem } from '../types/vocabulary';
import { ApiResponse } from '../api/apiUtils';
export function useNotes() {
  return useQuery<ApiResponse<VocabularyItem[]>>({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });
} 