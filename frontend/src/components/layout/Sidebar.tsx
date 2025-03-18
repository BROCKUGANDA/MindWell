import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Divider,
} from '@mui/material';
import {
  Dashboard,
  MoodRounded,
  Book,
  Chat,
  LocalLibrary,
  Help,
  Psychology,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsSidebarOpen } from '../../store/slices/uiSlice';
import { selectIsAuthenticated } from '../../store/slices/authSlice';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard', requiresAuth: true },
  { text: 'Mood Tracker', icon: <MoodRounded />, path: '/mood', requiresAuth: true },
  { text: 'Journal', icon: <Book />, path: '/journal', requiresAuth: true },
  { text: 'AI Chat Support', icon: <Chat />, path: '/chat', requiresAuth: true },
  { text: 'Resources', icon: <LocalLibrary />, path: '/resources', requiresAuth: false },
  { text: 'Crisis Help', icon: <Help />, path: '/crisis', requiresAuth: false },
  { text: 'Professional Help', icon: <Psychology />, path: '/professionals', requiresAuth: false },
];

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isOpen = useSelector(selectIsSidebarOpen);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const filteredMenuItems = menuItems.filter(
    item => !item.requiresAuth || (item.requiresAuth && isAuthenticated)
  );

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          mt: '64px', // Height of AppBar
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <List>
        {filteredMenuItems.map((item, index) => (
          <React.Fragment key={item.text}>
            {index > 0 && index % 4 === 0 && <Divider />}
            <ListItem
              button
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main + '20',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main + '30',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    color: location.pathname === item.path
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                  },
                }}
              />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar; 