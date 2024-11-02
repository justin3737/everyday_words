import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { fetchVocabulary, } from '../api/vocabularyApi';
import { addNote } from '../api/noteApi';
import Layout from '../components/common/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import WordPageContent from '../components/word/WordPageContent';
import { useAsyncData } from '../hooks/useAsyncData';
import { useAppToast } from '../hooks/useAppToast';
import { useNavigate } from 'react-router-dom';
import UnexpectedErrorCard from '../components/common/UnexpectedErrorCard';

function WordPage() {
  const navigate = useNavigate();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const appToast = useAppToast();
  
  const { data: words, loading, error } = useAsyncData({
    fetchFn: fetchVocabulary,
    errorMessage: '獲取單字資訊失敗'
  });

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (!words || error) {
    return (
      <Layout>
        <UnexpectedErrorCard onBack={() => navigate(-1)} />
      </Layout>
    );
  }

  if (words.length === 0) {
    return (
      <Layout>
        <ErrorMessage message="No word data available." />
      </Layout>
    );
  }

  const currentWord = words[currentWordIndex];

  const handleAddNote = async () => {
    try {
      const result = await addNote(currentWord);
      if (result.success) {
        appToast.success(result.message);
      } else {
        appToast.info(result.message);
      }
    } catch (error) {
      appToast.error('加入筆記失敗');
      console.error(error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentWordIndex(newPage - 1);
  };

  return (
    <Layout>
      <Box width="100%">
        <WordPageContent
          word={currentWord}
          onAddNote={handleAddNote}
          showNavigation={words.length > 1}
          currentIndex={currentWordIndex}
          totalWords={words.length}
          onPageChange={handlePageChange}
        />
      </Box>
    </Layout>
  );
}

export default WordPage;
