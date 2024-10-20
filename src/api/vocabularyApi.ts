import axios from 'axios';
import { VocabularyResponse, VocabularyItem } from '../types/vocabulary';

const getApiBaseUrl = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3700';
  if (!apiBaseUrl) {
    throw new Error('API base URL is not defined');
  }
  return apiBaseUrl;
};

export const fetchNotes = async (): Promise<VocabularyResponse> => {
  const apiBaseUrl = getApiBaseUrl();
  const response = await axios.get<VocabularyResponse>(`${apiBaseUrl}/api/notes`);
  return response.data;
};

export const fetchVocabulary = async (): Promise<VocabularyResponse> => {
  const apiBaseUrl = getApiBaseUrl();
  const response = await axios.get<VocabularyResponse>(`${apiBaseUrl}/api/vocabulary`);
  return response.data;
};

export const addNote = async (note: VocabularyItem): Promise<void> => {
  const apiBaseUrl = getApiBaseUrl();
  await axios.post(`${apiBaseUrl}/api/addNote`, note);
};
