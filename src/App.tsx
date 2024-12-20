import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home';
import WordPage from './pages/WordPage';
import NoteListPage from './pages/NoteListPage';
import SingleWordPage from './pages/SingleWordPage';
import NotFound from './pages/404';
import RegisterPage from './pages/RegisterPage';
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/word" element={<WordPage />} />
            <Route path="/word/:wordId" element={<SingleWordPage />} />
            <Route path="/notes" element={<NoteListPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
