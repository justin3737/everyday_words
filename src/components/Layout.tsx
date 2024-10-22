import React from 'react';
import { Box, Container, useBreakpointValue } from '@chakra-ui/react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

function Layout({ children, showHeader = true }: LayoutProps) {
  const containerMaxWidth = useBreakpointValue({ base: "100%", md: "container.md" });

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Container
        maxW={containerMaxWidth}
        w="100%"
        px={{ base: 2, sm: 4, md: 6 }}
        py={{ base: 3, sm: 4, md: 6 }}
      >
        {showHeader && <Header />}
        <Box as="main" flex="1">
          {children}
        </Box>
      </Container>
    </Box>
  );
}

export default Layout;
