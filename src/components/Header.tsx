import { Box, Flex, Button, IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

function Header() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const goToHome = () => {
    navigate('/');
    onClose();
  };

  const goToWordPage = () => {
    navigate('/word');
    onClose();
  };

  const goToNoteList = () => {
    navigate('/notes');
    onClose();
  };

  return (
    <Box bg="gray.100" py={4} position="sticky" top={0} zIndex={1000} alignItems="center">
      <Flex alignItems="center" justifyContent="space-between" px={4}>
        <Box onClick={goToHome} cursor="pointer">
          <img src="/logo.png" alt="App Icon" width="32px" height="32px"/>
        </Box>
        <Box display={{ base: 'block', md: 'none' }}>
          <IconButton
            aria-label="Open menu"
            icon={<GiHamburgerMenu />}
            onClick={onOpen}
          />
        </Box>
        <Flex display={{ base: 'none', md: 'flex' }}>
          <Button onClick={goToHome} mr={2}>登出</Button>
          <Button onClick={goToWordPage} mr={2}>每日單字</Button>
          <Button onClick={goToNoteList}>我的筆記</Button>
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <VStack spacing={4} mt={12}>
            <Button onClick={goToHome} width="100%">登出</Button>
            <Button onClick={goToWordPage} width="100%">每日單字</Button>
            <Button onClick={goToNoteList} width="100%">我的筆記</Button>
          </VStack>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Header;
