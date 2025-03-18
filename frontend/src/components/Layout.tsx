import { ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Book as JournalIcon,
  Mood as MoodIcon,
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isAuthenticated = false; // TODO: Implement authentication state

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    ...(isAuthenticated
      ? [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
          { text: 'Journal', icon: <JournalIcon />, path: '/journal' },
          { text: 'Mood Tracker', icon: <MoodIcon />, path: '/mood' },
          { text: 'AI Chat', icon: <ChatIcon />, path: '/chat' },
        ]
      : [
          { text: 'Login', icon: <LoginIcon />, path: '/login' },
          { text: 'Register', icon: <RegisterIcon />, path: '/register' },
        ]),
  ];

  const drawer = (
    <Box sx={{ bgcolor: 'background.paper', height: '100%' }}>
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <img
          src="/logo.png"
          alt="MindWell Logo"
          style={{ height: 40, marginRight: 12 }}
        />
        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
          MindWell
        </Typography>
      </Box>
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: location.pathname === item.path ? 'white' : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${240}px)` },
          ml: { md: `${240}px` },
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            {isMobile && (
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 600 }}
              >
                MindWell
              </Typography>
            )}
            <Box sx={{ flexGrow: 1 }} />
            {isAuthenticated && (
              <Button
                color="primary"
                onClick={() => console.log('Logout')}
                sx={{ fontWeight: 600 }}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { md: 240 },
          flexShrink: { md: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
              borderRight: 'none',
              boxShadow: 3,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
              borderRight: 'none',
              boxShadow: 3,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${240}px)` },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toolbar />
        <Box sx={{ flexGrow: 1, py: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
