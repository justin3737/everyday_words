import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, useToast } from '@chakra-ui/react';
import { VocabularyItem } from '../types/vocabulary';
import { addNote } from '../api/vocabularyApi';
import Layout from '../components/Layout';

import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import WordPageContent from '../components/WordPageContent';

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
  const [word, setWord] = useState<VocabularyItem | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const { word } = location.state || {};
    if (word) {
      setWord(word);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [location.state]);

  const handleAddNote = async () => {
    if (!word) return;
    try {
      const result = await addNote(word);
      toast({
        title: result.message,
        status: result.success ? 'success' : 'info',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding note:', error);
      toast({
        title: '加入筆記失敗',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (!word) {
    return (
      <Layout>
        <ErrorMessage message="No word data available." />
      </Layout>
    );
  }

  return (
    <Layout>
      <WordPageContent word={word} onAddNote={handleAddNote} />
      <Box mt={4}>
        <Button onClick={() => navigate(-1)}>返回</Button>
      </Box>
    </Layout>
  );
}

export default SingleWordPage;
