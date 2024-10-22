import { Box, Text } from '@chakra-ui/react';

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
      <Text color="red.500">{message}</Text>
    </Box>
  );
}

export default ErrorMessage;
