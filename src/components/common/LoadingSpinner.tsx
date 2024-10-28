import { Center, Spinner } from '@chakra-ui/react';

function LoadingSpinner() {
  return (
    <Center h="calc(100vh - 72px)">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  );
}

export default LoadingSpinner;
