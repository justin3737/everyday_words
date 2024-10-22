import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

function Layout({ children, showHeader = true }: LayoutProps) {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      {showHeader && <Header />}
      <Container
        as="main"
        maxW="container.md"
        w="100%"
        px={{ base: 4, md: 6 }}
        py={{ base: 4, md: 6 }}
        flex="1"
      >
        {children}
      </Container>
    </Box>
  );
}

export default Layout;
