import { Box, Text, Button, HStack, Flex } from '@chakra-ui/react';
import { FaVolumeUp, FaTrash } from 'react-icons/fa';
import { VocabularyItem } from '../../types/vocabulary';

interface NoteItemProps {
  note: VocabularyItem;
  onSpeak: (word: string) => void;
  onClick: () => void;
  onDelete: (word: string) => void;
}

const NoteItem = ({ note, onSpeak, onClick, onDelete }: NoteItemProps) => (
  <Box borderWidth={1} borderRadius="md" padding={4} onClick={onClick} cursor="pointer">
    <HStack justifyContent="space-between">
      <Flex direction="column" align="flex-start">
        <Text fontSize="xl" fontWeight="bold">
          {note.word} <Text as="span" fontSize="md" color="gray.600">[{note.phonetic}]</Text>
          <Button size="sm" onClick={(e) => { e.stopPropagation(); onSpeak(note.word); }} ml={2}>
            <FaVolumeUp />
          </Button>
        </Text>
        <Text fontSize="md">{note.definition}</Text>
      </Flex>
      <HStack>
        {/* <Button size="sm" onClick={(e) => e.stopPropagation()}><FaStar /></Button> */}
        <Button 
          size="sm" 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.word);
          }}
          aria-label='刪除筆記'
        >
          <FaTrash />
        </Button>
      </HStack>
    </HStack>
  </Box>
);

export default NoteItem;
