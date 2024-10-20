import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home';
import WordPage from './pages/WordPage';
import NoteListPage from './pages/NoteListPage';
import './App.css'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/word" element={<WordPage />} />
          <Route path="/notes" element={<NoteListPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
