import { useState, useEffect } from 'react';
import { Box, VStack, Text, HStack, Button, Spinner, Flex } from '@chakra-ui/react';
import { FaVolumeUp, FaStar } from 'react-icons/fa';
import { speakText } from '../utils/speechUtils';
import { NoteList } from '../types/note';
import { fetchNotes } from '../api/vocabularyApi';
import { useNavigate } from 'react-router-dom';
import { VocabularyItem } from '../types/vocabulary';
import Layout from '../components/Layout';

function NoteListPage() {
  const [notes, setNotes] = useState<NoteList>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotesData = async () => {
      try {
        const response = await fetchNotes();
        if (Array.isArray(response)) {
            setNotes(response as NoteList);
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

  const handleWordClick = (word: VocabularyItem) => {
    navigate('/word/' + encodeURIComponent(word.word), { state: { word } });
  };

  return (
    <Layout>
      <VStack spacing={4} align="stretch">
        {notes && notes.length > 0 ? (
          notes.map((note, index) => (
            <Box key={index} borderWidth={1} borderRadius="md" padding={4} onClick={() => handleWordClick(note)} cursor="pointer">
              <HStack justifyContent="space-between">
                <Flex direction="column" align="flex-start">
                  <Text fontSize="xl" fontWeight="bold">
                    {note.word} <Text as="span" fontSize="md" color="gray.600">[{note.phonetic}]</Text>
                    <Button size="sm" onClick={(e) => { e.stopPropagation(); handleSpeak(note.word); }} ml={2}>
                      <FaVolumeUp />
                    </Button>
                  </Text>
                  <Text fontSize="md">{note.definition}</Text>
                </Flex>
                <HStack>
                  <Button size="sm" onClick={(e) => e.stopPropagation()}><FaStar /></Button>
                </HStack>
              </HStack>
            </Box>
          ))
        ) : (
          <Text>No notes available.</Text>
        )}
      </VStack>
    </Layout>
  );
}

export default NoteListPage;
