import { Box, Flex, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  const goToWordPage = () => {
    navigate('/word');
  };

  const goToNoteList = () => {
    navigate('/notes');
  };

  return (
    <Box bg="gray.100" py={4}>
      <Flex maxW="container.xl" mx="auto" alignItems="center" justifyContent="space-between">
        <Box margin="4px 16px" onClick={goToHome} cursor="pointer">
          <img src="/src/assets/logo.png" alt="App Icon" width="32px" height="32px"/>
        </Box>
        <Flex>
          <Button onClick={goToHome} mr={2}>登出</Button>
          <Button onClick={goToWordPage} mr={2}>每日單字</Button>
          <Button onClick={goToNoteList}>我的筆記</Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
