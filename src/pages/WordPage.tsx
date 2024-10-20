import { useState, useEffect, useCallback } from 'react';
import { Box, VStack, Text, HStack, Button, useToast, Spinner, List, ListItem, ListIcon } from '@chakra-ui/react';
import { FaVolumeUp, FaStar, FaCircle } from 'react-icons/fa';
import Header from '../components/Header';
import axios from 'axios';
import { VocabularyItem } from '../types/vocabulary';
import { speakText } from '../utils/speechUtils';
import { fetchVocabulary, addNote } from '../api/vocabularyApi';

function WordPage() {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState<VocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchWords = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedWords = await fetchVocabulary();
      setWords(fetchedWords);
    } catch (error) {
      console.error('Error fetching words:', error);
      toast({
        title: '獲取詞彙失敗',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setWords([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  const speakWord = () => {
    speakText(words[currentIndex].word);
  };

  const addToNotes = async () => {
    try {
      await addNote(currentWord);
      toast({
        title: '已加入筆記',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast({
          title: '已加入過筆記',
          status: 'info',
          duration: 2000,
          isClosable: true,
        });
      } else {
        console.error('Error adding note:', error);
        toast({
          title: '加入筆記失敗',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const speakSentence = (sentence: string) => {
    speakText(sentence);
  };

  // Defensive rendering
  if (loading) {
    return (
      <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!words || words.length === 0) {
    return (
      <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <Text>No words available.</Text>
      </Box>
    );
  }

  const currentWord = words[currentIndex];

  if (!currentWord) {
    return (
      <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <Text>Error: Unable to load word.</Text>
      </Box>
    );
  }

  return (
    <Box minHeight="100vh">
      <Header />
      <VStack spacing={8} padding={8}>
        <Box width="100%" maxWidth="600px" textAlign="left">
          <HStack justifyContent="flex-start" width="100%">
            <Text fontSize="4xl" fontWeight="bold">{currentWord.word}</Text>
            <HStack ml="auto">
              <Button onClick={speakWord}><FaVolumeUp /></Button>
              <Button onClick={addToNotes}><FaStar /></Button>
            </HStack>
          </HStack>
          <Text fontSize="xl" color="gray.600">{currentWord.phonetic}</Text>
          <Text fontSize="xl" marginTop={4}>{currentWord.translation}</Text>
          <Text marginTop={4}>{currentWord.definition}</Text>
          <Text marginTop={4} fontWeight="bold">Examples:</Text>
          <List spacing={2} styleType="disc">
            {currentWord.examples.map((example, index) => (
              <ListItem key={index} display="flex" alignItems="flex-start">
                <ListIcon as={FaCircle} color="blue.500" fontSize="xs" marginTop={2} />
                <VStack align="flex-start" flex={1} ml={2}>
                  <Text>{example.sentence}</Text>
                  <Text color="gray.600">{example.translation}</Text>
                </VStack>
                <Button size="sm" onClick={() => speakSentence(example.sentence)} ml={2}>
                  <FaVolumeUp />
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
        <HStack spacing={4}>
          <Button onClick={handlePrevious} isDisabled={currentIndex === 0}>上一頁</Button>
          <Button onClick={handleNext} isDisabled={currentIndex === words.length - 1}>下一頁</Button>
        </HStack>
      </VStack>
    </Box>
  );
}

export default WordPage;
