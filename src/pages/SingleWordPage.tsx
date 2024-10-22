import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Spinner, Center, useToast } from '@chakra-ui/react';
import { VocabularyItem } from '../types/vocabulary';
import { addNote } from '../api/vocabularyApi';
import Layout from '../components/Layout';
import WordCard from '../components/WordCard';

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
        <Center h="calc(100vh - 72px)">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      </Layout>
    );
  }

  if (!word) {
    return (
      <Layout>
        <Box>No word data available.</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <WordCard word={word} onAddNote={handleAddNote} />
      <Box mt={4}>
        <Button onClick={() => navigate(-1)}>返回</Button>
      </Box>
    </Layout>
  );
}

export default SingleWordPage;
