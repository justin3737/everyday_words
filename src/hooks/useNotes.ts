import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../api/noteApi';

export function useNotes() {
  return useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });
} 