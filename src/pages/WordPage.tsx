import { Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { VocabularyItem } from '../types/vocabulary';
import { fetchVocabulary, addNote } from '../api/vocabularyApi';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import WordPageContent from '../components/WordPageContent';

function WordPage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [words, setWords] = useState<VocabularyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const initializeWords = async () => {
        try {
          const data = await fetchVocabulary();
          setWords(data);
        } catch (error) {
          console.error('Error fetching word data:', error);
        }
        setLoading(false);
    };

    initializeWords();
  }, []);

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
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
