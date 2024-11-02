import { Button, ButtonProps } from '@chakra-ui/react';

interface MajorButtonProps extends ButtonProps {
  children: React.ReactNode;
}

function MajorButton({ children, ...props }: MajorButtonProps) {
  return (
    <Button
      backgroundColor="blue.500"
      color="white"
      _hover={{ backgroundColor: 'blue.600' }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default MajorButton; 