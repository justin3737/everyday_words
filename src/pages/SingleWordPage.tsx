import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { addNote } from '../api/noteApi';
import Layout from '../components/common/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import WordPageContent from '../components/word/WordPageContent';
import { useVocabularyItem } from '../hooks/useVocabulary';

/**
 * SingleWordPage 組件
 * 
 * 這個組件用於顯示單個單詞的詳細信息。
 * 它從 URL 參數中獲取單詞，然後從 API 獲取該單詞的詳細信息。
 * 組件還處理添加筆記的功能，並在加載或錯誤時顯示適當的UI。
 */
function SingleWordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  // 從 URL 獲取單詞的邏輯
  const getWordFromUrl = () => {
    const wordFromPath = decodeURIComponent(window.location.pathname.split('/word/')[1]);
    const wordData = location.state?.word;
    return wordData?.word || wordFromPath || '';
  };

  // 使用 React Query 獲取單詞數據
  const { data: word, isLoading, error } = useVocabularyItem(getWordFromUrl());

  // 使用 React Query 處理添加筆記的邏輯
  const addNoteMutation = useMutation({
    mutationFn: addNote,
    onSuccess: (result) => {
      toast({
        title: result.message,
        status: result.success ? 'success' : 'info',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: '加入筆記失敗',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleAddNote = () => {
    if (!word) return;
    addNoteMutation.mutate(word);
  };

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (error || !word) {
    return (
      <Layout>
        <ErrorMessage message="No word data available." />
      </Layout>
    );
  }

  return (
    <Layout>
      <WordPageContent 
        word={word} 
        onAddNote={handleAddNote} 
        showNavigation={false}
        currentIndex={0}
        totalWords={1}
        onPageChange={() => {}}
      />
      <Box mt={4}>
        <Button onClick={() => navigate(-1)}>返回</Button>
      </Box>
    </Layout>
  );
}

export default SingleWordPage;
