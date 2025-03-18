import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface UIState {
  snackbar: {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  };
  theme: 'light' | 'dark';
  isSidebarOpen: boolean;
  isModalOpen: {
    createMood: boolean;
    createJournal: boolean;
    viewResource: boolean;
  };
}

const initialState: UIState = {
  snackbar: {
    open: false,
    message: '',
    severity: 'info',
  },
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  isSidebarOpen: true,
  isModalOpen: {
    createMood: false,
    createJournal: false,
    viewResource: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{ message: string; severity: 'success' | 'error' | 'info' | 'warning' }>
    ) => {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity,
      };
    },
    hideSnackbar: (state) => {
      state.snackbar.open = false;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openModal: (
      state,
      action: PayloadAction<keyof UIState['isModalOpen']>
    ) => {
      state.isModalOpen[action.payload] = true;
    },
    closeModal: (
      state,
      action: PayloadAction<keyof UIState['isModalOpen']>
    ) => {
      state.isModalOpen[action.payload] = false;
    },
  },
});

export const {
  showSnackbar,
  hideSnackbar,
  toggleTheme,
  toggleSidebar,
  openModal,
  closeModal,
} = uiSlice.actions;

export const selectUI = (state: RootState) => state.ui;
export const selectSnackbar = (state: RootState) => state.ui.snackbar;
export const selectTheme = (state: RootState) => state.ui.theme;
export const selectIsSidebarOpen = (state: RootState) => state.ui.isSidebarOpen;
export const selectIsModalOpen = (state: RootState) => state.ui.isModalOpen;

export default uiSlice.reducer; 