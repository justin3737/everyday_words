import { VStack, Image, Text, Input, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function Home() {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/word');
  };

  return (
    <Layout showHeader={false}>
      <VStack spacing={8} justify="center">
        <Image src="/src/assets/logo.png" alt="App Icon" boxSize="150px" my={20}/>
        <Text fontSize="2xl" fontWeight="bold">每日記單字</Text>
        <VStack spacing={4} width="300px">
          <Input placeholder="帳號" />
          <Input placeholder="密碼" type="password" />
          <Button colorScheme="blue" width="100%" onClick={handleEnter}>Enter</Button>
        </VStack>
      </VStack>
    </Layout>
  );
}

export default Home;
