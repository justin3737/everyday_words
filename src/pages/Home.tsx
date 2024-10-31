import { VStack, Image, Text} from '@chakra-ui/react';
import Layout from '../components/common/Layout';
import LoginButton from '../components/button/LoginButton';

function Home() {

  return (
    <Layout showHeader={false}>
      <VStack spacing={8} justify="center">
        <Image src="/logo.png" alt="App Icon" boxSize="150px" my={20}/>
        <Text fontSize="2xl" fontWeight="bold">每日隨機單字</Text>
        <VStack spacing={4} width="300px">
          <LoginButton />
        </VStack>
      </VStack>
    </Layout>
  );
}

export default Home;
