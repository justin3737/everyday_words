import { Box, VStack } from '@chakra-ui/react';
import { VocabularyItem } from '../../types/vocabulary';
import WordCard from './WordCard';
import PaginationNav from '../common/PaginationNav';

/**
 * WordPageContent 組件的 props 接口
 */
interface WordPageContentProps {
  /** 要顯示的單詞對象 */
  word: VocabularyItem;
  
  /** 添加筆記的回調函數 */
  onAddNote: () => void;
  
  /** 是否顯示導航按鈕 */
  showNavigation: boolean;
  
  /** 目前頁面的索引 */
  currentIndex: number;
  
  /** 總共的單詞數 */
  totalWords: number;
  
  /** 頁面變更的回調函數 */
  onPageChange: (newPage: number) => void;
}

/**
 * WordPageContent 組件
 * 
 * 這個組件負責渲染單詞的詳細信息，包括單詞卡片和可選的導航按鈕。
 * 它是一個可重用的組件，可以在不同的頁面中使用，如單詞頁面和單詞列表頁面。
 */
function WordPageContent({
  word,
  onAddNote,
  showNavigation,
  currentIndex,
  totalWords,
  onPageChange
}: WordPageContentProps) {
  return (
    <VStack spacing={4} align="stretch">
      <WordCard word={word} onAddNote={onAddNote} />
      {showNavigation && (
        <Box mt={4}>
          <PaginationNav
            currentPage={currentIndex + 1}
            totalPages={totalWords}
            onPageChange={onPageChange}
            showPageNumbers={totalWords > 1}
          />
        </Box>
      )}
    </VStack>
  );
}

export default WordPageContent;
