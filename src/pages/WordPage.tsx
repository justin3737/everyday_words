import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, Text, VStack, Spinner, Center, HStack, IconButton, Flex, useToast } from '@chakra-ui/react';
import { VocabularyItem } from '../types/vocabulary';
import { fetchVocabulary, addNote } from '../api/vocabularyApi';
import Header from '../components/Header';
import { FaVolumeUp, FaStar } from 'react-icons/fa';
import { speakText } from '../utils/speechUtils';

function WordPage() {
  const location = useLocation();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [words, setWords] = useState<VocabularyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSingleWord, setIsSingleWord] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const { words } = location.state || {};

    const initializeWords = async () => {
      if (words) {
        setWords(Array.isArray(words) ? words : [words]);
        setIsSingleWord(!Array.isArray(words));
        setLoading(false);
      } else {
        try {
          const data = await fetchVocabulary();
          setWords(data);
          setIsSingleWord(false);
        } catch (error) {
          console.error('Error fetching word data:', error);
        }
        setLoading(false);
      } 
    };

    initializeWords();
  }, [location.state]);

  const handlePrevious = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <Center h="calc(100vh - 72px)"> 
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      </>
    );
  }

  if (words.length === 0) {
    return (
      <>
        <Header />
        <Box>No word data available.</Box>
      </>
    );
  }

  const currentWord = isSingleWord ? words[0] : words[currentWordIndex];

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

  return (
    <>
      <Header />
      <Box p={4}>
        <VStack spacing={4} align="start">
          <Flex alignItems="center">
            <Text fontSize="2xl" fontWeight="bold">{currentWord.word}</Text>
            <IconButton
              aria-label="Pronounce word"
              icon={<FaVolumeUp />}
              onClick={() => speakText(currentWord.word)}
              size="sm"
              ml={2}
            />
            <IconButton
              aria-label="Add to notes"
              icon={<FaStar />}
              onClick={handleAddNote}
              size="sm"
              ml={2}
            />
          </Flex>
          <Text>{currentWord.phonetic}</Text>
          <Text>{currentWord.translation}</Text>
          <Text>{currentWord.definition}</Text>
          <Box>
            <Text fontWeight="bold" textAlign="left">Examples:</Text>
            {currentWord.examples.map((example, index) => (
              <VStack key={index} align="start" spacing={1} mt={2}>
                <HStack>
                  <Text>{example.sentence}</Text>
                  <IconButton
                    aria-label="Pronounce sentence"
                    icon={<FaVolumeUp />}
                    onClick={() => speakText(example.sentence)}
                    size="sm"
                  />
                </HStack>
                <Text color="gray.600">{example.translation}</Text>
              </VStack>
            ))}
          </Box>
        </VStack>
        
        {!isSingleWord && words.length > 1 && (
          <Box mt={4}>
            <Button onClick={handlePrevious} disabled={currentWordIndex === 0} mr={2}>Previous</Button>
            <Button onClick={handleNext} disabled={currentWordIndex === words.length - 1}>Next</Button>
          </Box>
        )}
      </Box>
    </>
  );
}

export default WordPage;
