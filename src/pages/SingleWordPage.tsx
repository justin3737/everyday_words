import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, useToast } from '@chakra-ui/react';
import { VocabularyItem } from '../types/vocabulary';
import { fetchVocabularyByWord } from '../api/vocabularyApi';
import { addNote } from '../api/noteApi';
import Layout from '../components/common/Layout';

import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import WordPageContent from '../components/word/WordPageContent';

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
    const fetchWord = async () => {
      try {
        const getWordFromUrl = () => {
          const wordFromPath = decodeURIComponent(window.location.pathname.split('/word/')[1]);
          const wordData = location.state?.word;
          return wordData?.word || wordFromPath || '';
        };

        const searchWord = getWordFromUrl();
        
        if (!searchWord) {
          setLoading(false);
          return;
        }
        
        const result = await fetchVocabularyByWord(searchWord);
        console.log(result);
        setWord(result);
      } catch (error) {
        console.error('Error fetching word:', error);
        toast({
          title: '獲取單字資訊失敗',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWord();
  }, [location.state, toast]);

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
