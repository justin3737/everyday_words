import { Box, Button } from '@chakra-ui/react';
import { VocabularyItem } from '../types/vocabulary';
import WordCard from './WordCard';

/**
 * WordPageContent 組件的 props 接口
 */
interface WordPageContentProps {
  /** 要顯示的單詞對象 */
  word: VocabularyItem;
  
  /** 添加筆記的回調函數 */
  onAddNote: () => Promise<void>;
  
  /** 是否顯示導航按鈕 */
  showNavigation?: boolean;
  
  /** 點擊"上一個"按鈕時的回調函數 */
  onPrevious?: () => void;
  
  /** 點擊"下一個"按鈕時的回調函數 */
  onNext?: () => void;
  
  /** "上一個"按鈕是否禁用 */
  isPreviousDisabled?: boolean;
  
  /** "下一個"按鈕是否禁用 */
  isNextDisabled?: boolean;
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
  showNavigation = false,
  onPrevious,
  onNext,
  isPreviousDisabled,
  isNextDisabled
}: WordPageContentProps) {
  return (
    <>
      <WordCard word={word} onAddNote={onAddNote} />
      {showNavigation && (
        <Box mt={4}>
          <Button onClick={onPrevious} disabled={isPreviousDisabled} mr={2}>Previous</Button>
          <Button onClick={onNext} disabled={isNextDisabled}>Next</Button>
        </Box>
      )}
    </>
  );
}

export default WordPageContent;
