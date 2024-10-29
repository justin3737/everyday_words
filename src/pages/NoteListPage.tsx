import { useState, useEffect } from 'react';
import { VStack, Text, useToast } from '@chakra-ui/react';
import { speakText } from '../utils/speechUtils';
import { NoteList } from '../types/note';
import { deleteNote, fetchNotes } from '../api/noteApi';
import { useNavigate } from 'react-router-dom';
import { VocabularyItem } from '../types/vocabulary';
import Layout from '../components/common/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import PaginationNav from '../components/common/PaginationNav';
import NoteItem from '../components/note/NoteItem';

function NoteListPage() {
  const [notes, setNotes] = useState<NoteList>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const toast = useToast();

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

  // 計算總頁數
  const totalPages = Math.ceil(notes.length / itemsPerPage);

  // 獲取當前頁的筆記
  const getCurrentPageNotes = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return notes.slice(startIndex, endIndex);
  };

  // 處理頁面變更
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorMessage message={error} />
      </Layout>
    );
  }

  const handleSpeak = (word: string) => {
    speakText(word);
  };

  const handleWordClick = (word: VocabularyItem) => {
    navigate('/word/' + encodeURIComponent(word.word), { state: { word } });
  };

  const handleDeleteNote = async (word: string) => {
    try {
      const result = await deleteNote(word);
      if (result.success) {
        // 重新獲取筆記列表
        const response = await fetchNotes();
        if (Array.isArray(response)) {
          setNotes(response as NoteList);
        }
        toast({
          title: '成功',
          description: result.message,
          status: 'success',
          duration: 3000,
          isClosable: true
        });
      } else {
        toast({
          title: '失敗',
          description: result.message,
          status: 'error',
          duration: 3000,
          isClosable: true
        });
      }
    } catch (err) {
      console.error('Error deleting note:', err);
      toast({
        title: '錯誤',
        description: '刪除筆記時發生錯誤',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Layout>
      <VStack
        alignItems="stretch"
        width="100%"
      >
        {notes && notes.length > 0 ? (
          <>
            {getCurrentPageNotes().map((note, index) => (
              <NoteItem
                key={index}
                note={note}
                onSpeak={handleSpeak}
                onClick={() => handleWordClick(note)}
                onDelete={handleDeleteNote}
              />
            ))}
            <PaginationNav
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <Text>No notes available.</Text>
        )}
      </VStack>
    </Layout>
  );
}

export default NoteListPage;
