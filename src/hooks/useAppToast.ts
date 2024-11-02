import { useToast } from '@chakra-ui/react';

export function useAppToast() {
  const toast = useToast();

  return {
    success: (title: string, description?: string) => {
      toast({
        title,
        description,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
    error: (title: string, description?: string) => {
      toast({
        title,
        description,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    },
    info: (title: string, description?: string) => {
      toast({
        title,
        description,
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    },
  };
} 