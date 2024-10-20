import { useState, useEffect } from 'react';
import { Box, VStack, Text, HStack, Button, Spinner, Flex } from '@chakra-ui/react';
import { FaVolumeUp, FaStar } from 'react-icons/fa';
import Header from '../components/Header';
import { speakText } from '../utils/speechUtils';
import { NoteList } from '../types/note';
import { fetchNotes } from '../api/vocabularyApi';

function NoteListPage() {
  const [notes, setNotes] = useState<NoteList>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotesData = async () => {
      try {
        const response = await fetchNotes();
        if (Array.isArray(response)) {
          // 使用類型守衛來確保 response 是 NoteList 類型
          if (isNoteList(response)) {
            setNotes(response);
          } else {
            throw new Error('Invalid note data format received from API');
          }
        } else {
          throw new Error('Invalid data format received from API');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching notes:', err);
        setError('Failed to fetch notes');
        setLoading(false);
      }
    };

    fetchNotesData();
  }, []);

  if (loading) {
    return (
      <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  const handleSpeak = (word: string) => {
    speakText(word);
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />
      <VStack spacing={4} padding={8} align="stretch" maxWidth="600px" margin="0 auto" flex="1">
        {notes && notes.length > 0 ? (
          notes.map((note, index) => (
            <Box key={index} borderWidth={1} borderRadius="md" padding={4}>
              <HStack justifyContent="space-between">
                <Flex direction="column" align="flex-start">
                  <Text fontSize="xl" fontWeight="bold">
                    {note.word} <Text as="span" fontSize="md" color="gray.600">[{note.phonetic}]</Text>
                    <Button size="sm" onClick={() => handleSpeak(note.word)} ml={2}>
                      <FaVolumeUp />
                    </Button>
                  </Text>
                  <Text fontSize="md">{note.definition}</Text>
                </Flex>
                <HStack>
                  <Button size="sm"><FaStar /></Button>
                </HStack>
              </HStack>
            </Box>
          ))
        ) : (
          <Text>No notes available.</Text>
        )}
      </VStack>
    </Box>
  );
}

export default NoteListPage;

// 在組件外部或文件頂部添加這個類型守衛函數
function isNoteList(data: unknown): data is NoteList {
  return Array.isArray(data) && data.every((item) => 
    typeof item === 'object' &&
    item !== null &&
    'word' in item &&
    'phonetic' in item &&
    'definition' in item
  );
}
