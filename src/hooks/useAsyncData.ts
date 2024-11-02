import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

interface UseAsyncDataOptions<T> {
  fetchFn: () => Promise<T>;
  errorMessage?: string;
  successMessage?: string;
  onSuccess?: (data: T) => void;
}

export function useAsyncData<T>({ 
  fetchFn, 
  errorMessage = '載入失敗', 
  successMessage,
  onSuccess 
}: UseAsyncDataOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFn();
        setData(result);
        if (successMessage) {
          toast({
            title: successMessage,
            status: 'success',
            duration: 2000,
          });
        }
        onSuccess?.(result);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(errorMessage);
        toast({
          title: errorMessage,
          status: 'error',
          duration: 2000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFn, errorMessage, successMessage, toast, onSuccess]);

  return { data, loading, error };
} 