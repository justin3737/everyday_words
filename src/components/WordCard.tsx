import React from 'react';
import { Box, Text, VStack, IconButton, Flex, HStack } from '@chakra-ui/react';
import { FaVolumeUp, FaStar } from 'react-icons/fa';
import { VocabularyItem } from '../types/vocabulary';
import { speakText } from '../utils/speechUtils';

interface WordCardProps {
  word: VocabularyItem;
  onAddNote: () => void;
}

const WordCard: React.FC<WordCardProps> = ({ word, onAddNote }) => {
  return (
    <VStack spacing={4} align="stretch">
      <Box p={4}>
        <Flex alignItems="center">
          <Text fontSize="2xl" fontWeight="bold">{word.word}</Text>
          <Text>{word.phonetic}</Text>
          <IconButton
            aria-label="Pronounce word"
            icon={<FaVolumeUp />}
            onClick={() => speakText(word.word)}
            size="sm"
            ml={2}
          />
          <IconButton
            aria-label="Add to notes"
            icon={<FaStar />}
            onClick={onAddNote}
            size="sm"
            ml={2}
          />
        </Flex>
        <Box textAlign="left">
          <Text>{word.translation}</Text>
          <Text>{word.definition}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" textAlign="left">Examples:</Text>
          {word.examples.map((example, index) => (
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
      </Box>
    </VStack>
  );
};

export default WordCard;
