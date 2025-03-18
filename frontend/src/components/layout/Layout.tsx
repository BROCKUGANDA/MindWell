import React from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/slices/uiSlice';
import { lightTheme, darkTheme } from '../../theme';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SnackbarManager from '../common/SnackbarManager';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const themeMode = useSelector(selectTheme);
  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Navbar />
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            backgroundColor: theme.palette.background.default,
          }}
        >
          {children}
        </Box>
        <SnackbarManager />
      </Box>
    </ThemeProvider>
  );
};

export default Layout; 