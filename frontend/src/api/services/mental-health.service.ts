import apiClient from '../client';

interface MoodEntry {
  id?: string;
  mood_level: number;
  notes: string;
  timestamp?: string;
  tags?: string[];
}

interface JournalEntry {
  id?: string;
  title: string;
  content: string;
  timestamp?: string;
  mood_reference?: string;
  tags?: string[];
}

interface ChatMessage {
  id?: string;
  content: string;
  timestamp?: string;
  sender_type: 'user' | 'ai';
  sentiment?: number;
}

export const mentalHealthService = {
  // Mood tracking
  async createMoodEntry(data: MoodEntry) {
    const response = await apiClient.post('/moods', data);
    return response.data;
  },

  async getMoodEntries(params?: { start_date?: string; end_date?: string }) {
    const response = await apiClient.get('/moods', { params });
    return response.data;
  },

  // Journal entries
  async createJournalEntry(data: JournalEntry) {
    const response = await apiClient.post('/journals', data);
    return response.data;
  },

  async getJournalEntries(params?: { page?: number; limit?: number }) {
    const response = await apiClient.get('/journals', { params });
    return response.data;
  },

  async getJournalEntry(id: string) {
    const response = await apiClient.get(`/journals/${id}`);
    return response.data;
  },

  // AI Chat support
  async sendChatMessage(content: string) {
    const response = await apiClient.post<ChatMessage>('/chat', { content });
    return response.data;
  },

  async getChatHistory(params?: { limit?: number }) {
    const response = await apiClient.get<ChatMessage[]>('/chat/history', { params });
    return response.data;
  },

  // Resources
  async getResources(params?: { category?: string; tags?: string[] }) {
    const response = await apiClient.get('/resources', { params });
    return response.data;
  },

  // Crisis detection
  async assessCrisisLevel(data: { content: string }) {
    const response = await apiClient.post('/crisis/assess', data);
    return response.data;
  },

  async getProfessionalReferrals(params?: { location?: string; specialty?: string }) {
    const response = await apiClient.get('/referrals', { params });
    return response.data;
  },
}; 