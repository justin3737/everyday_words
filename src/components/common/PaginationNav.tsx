import React from 'react';
import { HStack, Button, Text, Center } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationNavProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  showPageNumbers?: boolean;
}

const PaginationNav: React.FC<PaginationNavProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true
}) => {
  return (
    <Center mt={4}>
      <HStack spacing={4}>
        <Button
          leftIcon={<FaChevronLeft />}
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        {showPageNumbers && (
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
        )}
        <Button
          rightIcon={<FaChevronRight />}
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </HStack>
    </Center>
  );
};

export default PaginationNav;
