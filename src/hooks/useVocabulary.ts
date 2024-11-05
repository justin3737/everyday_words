import { useQuery } from '@tanstack/react-query';
import { fetchVocabulary, fetchVocabularyByWord } from '../api/vocabularyApi';
import { VocabularyItem } from '../types/vocabulary';

export function useVocabularyList() {
  return useQuery({
    queryKey: ['vocabulary'],
    queryFn: fetchVocabulary,
  });
}

export function useVocabularyItem(word: string) {
  return useQuery<VocabularyItem>({
    queryKey: ['word', word],
    queryFn: () => fetchVocabularyByWord(word),
    enabled: !!word,
  });
} 