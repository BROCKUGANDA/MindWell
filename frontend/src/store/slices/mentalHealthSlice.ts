import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mentalHealthService } from '../../api/services/mental-health.service';
import type { RootState } from '../index';

interface MentalHealthState {
  moods: any[];
  journals: any[];
  chatHistory: any[];
  resources: any[];
  isLoading: {
    moods: boolean;
    journals: boolean;
    chat: boolean;
    resources: boolean;
  };
  error: string | null;
}

const initialState: MentalHealthState = {
  moods: [],
  journals: [],
  chatHistory: [],
  resources: [],
  isLoading: {
    moods: false,
    journals: false,
    chat: false,
    resources: false,
  },
  error: null,
};

// Mood Tracking
export const createMoodEntry = createAsyncThunk(
  'mentalHealth/createMoodEntry',
  async (data: { mood_level: number; notes: string; tags?: string[] }, { rejectWithValue }) => {
    try {
      const response = await mentalHealthService.createMoodEntry(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to create mood entry');
    }
  }
);

export const getMoodEntries = createAsyncThunk(
  'mentalHealth/getMoodEntries',
  async (params: { start_date?: string; end_date?: string } = {}, { rejectWithValue }) => {
    try {
      const response = await mentalHealthService.getMoodEntries(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to get mood entries');
    }
  }
);

// Journal Entries
export const createJournalEntry = createAsyncThunk(
  'mentalHealth/createJournalEntry',
  async (data: { title: string; content: string; tags?: string[] }, { rejectWithValue }) => {
    try {
      const response = await mentalHealthService.createJournalEntry(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to create journal entry');
    }
  }
);

export const getJournalEntries = createAsyncThunk(
  'mentalHealth/getJournalEntries',
  async (params: { page?: number; limit?: number } = {}, { rejectWithValue }) => {
    try {
      const response = await mentalHealthService.getJournalEntries(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to get journal entries');
    }
  }
);

// Chat
export const sendChatMessage = createAsyncThunk(
  'mentalHealth/sendChatMessage',
  async (content: string, { rejectWithValue }) => {
    try {
      const response = await mentalHealthService.sendChatMessage(content);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to send message');
    }
  }
);

export const getChatHistory = createAsyncThunk(
  'mentalHealth/getChatHistory',
  async (params: { limit?: number } = {}, { rejectWithValue }) => {
    try {
      const response = await mentalHealthService.getChatHistory(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to get chat history');
    }
  }
);

// Resources
export const getResources = createAsyncThunk(
  'mentalHealth/getResources',
  async (params: { category?: string; tags?: string[] } = {}, { rejectWithValue }) => {
    try {
      const response = await mentalHealthService.getResources(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to get resources');
    }
  }
);

const mentalHealthSlice = createSlice({
  name: 'mentalHealth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Mood Entries
      .addCase(createMoodEntry.pending, (state) => {
        state.isLoading.moods = true;
        state.error = null;
      })
      .addCase(createMoodEntry.fulfilled, (state, action) => {
        state.isLoading.moods = false;
        state.moods.unshift(action.payload);
      })
      .addCase(createMoodEntry.rejected, (state, action) => {
        state.isLoading.moods = false;
        state.error = action.payload as string;
      })
      .addCase(getMoodEntries.pending, (state) => {
        state.isLoading.moods = true;
      })
      .addCase(getMoodEntries.fulfilled, (state, action) => {
        state.isLoading.moods = false;
        state.moods = action.payload;
      })
      .addCase(getMoodEntries.rejected, (state, action) => {
        state.isLoading.moods = false;
        state.error = action.payload as string;
      })
      // Journal Entries
      .addCase(createJournalEntry.pending, (state) => {
        state.isLoading.journals = true;
        state.error = null;
      })
      .addCase(createJournalEntry.fulfilled, (state, action) => {
        state.isLoading.journals = false;
        state.journals.unshift(action.payload);
      })
      .addCase(createJournalEntry.rejected, (state, action) => {
        state.isLoading.journals = false;
        state.error = action.payload as string;
      })
      .addCase(getJournalEntries.pending, (state) => {
        state.isLoading.journals = true;
      })
      .addCase(getJournalEntries.fulfilled, (state, action) => {
        state.isLoading.journals = false;
        state.journals = action.payload;
      })
      .addCase(getJournalEntries.rejected, (state, action) => {
        state.isLoading.journals = false;
        state.error = action.payload as string;
      })
      // Chat
      .addCase(sendChatMessage.pending, (state) => {
        state.isLoading.chat = true;
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.isLoading.chat = false;
        state.chatHistory.push(action.payload);
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.isLoading.chat = false;
        state.error = action.payload as string;
      })
      .addCase(getChatHistory.pending, (state) => {
        state.isLoading.chat = true;
      })
      .addCase(getChatHistory.fulfilled, (state, action) => {
        state.isLoading.chat = false;
        state.chatHistory = action.payload;
      })
      .addCase(getChatHistory.rejected, (state, action) => {
        state.isLoading.chat = false;
        state.error = action.payload as string;
      })
      // Resources
      .addCase(getResources.pending, (state) => {
        state.isLoading.resources = true;
      })
      .addCase(getResources.fulfilled, (state, action) => {
        state.isLoading.resources = false;
        state.resources = action.payload;
      })
      .addCase(getResources.rejected, (state, action) => {
        state.isLoading.resources = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = mentalHealthSlice.actions;

export const selectMentalHealth = (state: RootState) => state.mentalHealth;
export const selectMoods = (state: RootState) => state.mentalHealth.moods;
export const selectJournals = (state: RootState) => state.mentalHealth.journals;
export const selectChatHistory = (state: RootState) => state.mentalHealth.chatHistory;
export const selectResources = (state: RootState) => state.mentalHealth.resources;
export const selectMentalHealthLoading = (state: RootState) => state.mentalHealth.isLoading;
export const selectMentalHealthError = (state: RootState) => state.mentalHealth.error;

export default mentalHealthSlice.reducer; 