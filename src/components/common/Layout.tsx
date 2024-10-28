import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

function Layout({ children, showHeader = true }: LayoutProps) {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" width="100%" maxWidth="container.md" mx="auto">
      <Box width="100%">
        {showHeader && <Header />}
        <Box as="main" flex="1" width="100%">
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
