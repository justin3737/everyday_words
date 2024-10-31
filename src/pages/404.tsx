import { VStack, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/common/Layout';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout showHeader={false}>
      <VStack spacing={8} justify="center">
        <Heading
          fontSize="6xl"
          fontWeight="bold"
          color="blue.500"
          my={20}
        >
          404
        </Heading>
        <Text fontSize="2xl" fontWeight="bold">頁面不存在</Text>
        <VStack spacing={4} width="300px">
          <Text color="gray.500">您要找的頁面似乎不存在</Text>
          <Button 
            colorScheme="blue" 
            width="100%" 
            onClick={() => navigate('/')}
          >
            返回首頁
          </Button>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default NotFound; 