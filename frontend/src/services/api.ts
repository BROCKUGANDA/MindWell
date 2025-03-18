import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (email: string, password: string, name: string) => {
  const response = await api.post('/auth/register', { email, password, name });
  return response.data;
};

// Journal APIs
export const createJournalEntry = async (content: string, mood: string, tags: string[]) => {
  const response = await api.post('/journal/entries', { content, mood, tags });
  return response.data;
};

export const getJournalEntries = async (page: number = 1, limit: number = 10) => {
  const response = await api.get(`/journal/entries?page=${page}&limit=${limit}`);
  return response.data;
};

// Mood Tracking APIs
export const recordMood = async (mood: string, intensity: number, notes: string) => {
  const response = await api.post('/mood/record', { mood, intensity, notes });
  return response.data;
};

export const getMoodHistory = async (startDate?: string, endDate?: string) => {
  const params = new URLSearchParams();
  if (startDate) params.append('start_date', startDate);
  if (endDate) params.append('end_date', endDate);
  
  const response = await api.get(`/mood/history?${params.toString()}`);
  return response.data;
};

// Chat APIs
export const sendMessage = async (message: string) => {
  const response = await api.post('/chat/message', { message });
  return response.data;
};

export const getChatHistory = async () => {
  const response = await api.get('/chat/history');
  return response.data;
};

// User APIs
export const getUserProfile = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

export const updateUserProfile = async (data: {
  name?: string;
  email?: string;
  preferences?: Record<string, unknown>;
}) => {
  const response = await api.put('/users/me', data);
  return response.data;
};
