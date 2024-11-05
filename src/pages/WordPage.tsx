import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { addNote } from '../api/noteApi';
import Layout from '../components/common/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import WordPageContent from '../components/word/WordPageContent';
import { useAppToast } from '../hooks/useAppToast';
import { useNavigate } from 'react-router-dom';
import UnexpectedErrorCard from '../components/common/UnexpectedErrorCard';
import { useMutation } from '@tanstack/react-query';
import { useVocabularyList } from '../hooks/useVocabulary';

function WordPage() {
  const navigate = useNavigate();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const appToast = useAppToast();

  const { data: words, isLoading, error } = useVocabularyList();

  const addNoteMutation = useMutation({
    mutationFn: addNote,
    onSuccess: (result) => {
      if (result.success) {
        appToast.success(result.message);
      } else {
        appToast.info(result.message);
      }
    },
    onError: () => {
      appToast.error('加入筆記失敗');
    },
  });

  if (isLoading) {
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

  const handleAddNote = () => {
    addNoteMutation.mutate(currentWord);
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
