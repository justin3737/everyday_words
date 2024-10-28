import React from 'react';
import { Box, Text, VStack, IconButton, Flex, HStack } from '@chakra-ui/react';
import { FaVolumeUp, FaStar } from 'react-icons/fa';
import { VocabularyItem } from '../../types/vocabulary';
import { speakText } from '../../utils/speechUtils';

interface WordCardProps {
  word: VocabularyItem;
  onAddNote: () => void;
}

const WordCard: React.FC<WordCardProps> = ({ word, onAddNote }) => {
  return (
    <Box borderWidth={1} borderRadius="md" p={4} bg="white">
      <VStack spacing={3} align="stretch">
        <Flex justifyContent="space-between" alignItems="center">
          <HStack spacing={2}>
            <Text fontSize="xl" fontWeight="bold">{word.word}</Text>
            <Text fontSize="md" color="gray.600">[{word.phonetic}]</Text>
          </HStack>
          <HStack spacing={2}>
            <IconButton
              aria-label="Pronounce word"
              icon={<FaVolumeUp />}
              onClick={() => speakText(word.word)}
              size="sm"
            />
            <IconButton
              aria-label="Add to notes"
              icon={<FaStar />}
              onClick={onAddNote}
              size="sm"
            />
          </HStack>
        </Flex>
        
        <VStack align="start" spacing={2}>
          <Text fontSize="md" fontWeight="medium">{word.translation}</Text>
          <Text fontSize="sm">{word.definition}</Text>
        </VStack>
        
        <Box>
          <Text fontWeight="bold" fontSize="lg" mb={3}>Examples:</Text>
          {word.examples.length > 0 && word.examples.map((example, index) => (
            <VStack key={index} align="start" spacing={2} mb={4}>
              <HStack spacing={3}>
                <Text fontStyle="italic">"{example.sentence}"</Text>
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
    </Box>
  );
};

export default WordCard;
