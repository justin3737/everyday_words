import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

function Layout({ children, showHeader = true }: LayoutProps) {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Box
        maxW={{ base: "100%", md: "container.md" }}
        w="100%"
        mx="auto"
        px={{ base: 2, sm: 4, md: 6 }}
        py={{ base: 3, sm: 4, md: 6 }}
      >
        {showHeader && <Header />}
        <Box as="main" flex="1">
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
