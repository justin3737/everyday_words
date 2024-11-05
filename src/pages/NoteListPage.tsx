import { useState } from 'react';
import { VStack, Text, useToast } from '@chakra-ui/react';
import { speakText } from '../utils/speechUtils';
import { deleteNote }from '../api/noteApi';
import { useNavigate } from 'react-router-dom';
import { VocabularyItem } from '../types/vocabulary';
import Layout from '../components/common/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import PaginationNav from '../components/common/PaginationNav';
import NoteItem from '../components/note/NoteItem';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotes } from '../hooks/useNotes';

function NoteListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  // 使用 React Query 獲取筆記
  const { data: notes = [], isLoading, error } = useNotes();

  // 使用 React Query 處理刪除筆記
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: async (result) => {
      if (result.success) {
        // 重新獲取筆記列表
        await queryClient.invalidateQueries({ queryKey: ['notes'] });
        toast({
          title: '成功',
          description: result.message,
          status: 'success',
          duration: 3000,
          isClosable: true
        });
      }
    },
    onError: (err) => {
      console.error('Error deleting note:', err);
      toast({
        title: '錯誤',
        description: '刪除筆記時發生錯誤',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  });

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

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorMessage message={(error as Error).message} />
      </Layout>
    );
  }

  const handleSpeak = (word: string) => {
    speakText(word);
  };

  const handleWordClick = (word: VocabularyItem) => {
    navigate('/word/' + encodeURIComponent(word.word), { state: { word } });
  };

  const handleDeleteNote = (word: string) => {
    deleteMutation.mutate(word);
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
