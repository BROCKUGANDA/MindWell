import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Switch,
  FormControlLabel,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';
import { showSnackbar } from '../store/slices/uiSlice';

interface NotificationSettings {
  email: boolean;
  push: boolean;
  reminders: boolean;
}

interface PrivacySettings {
  profileVisibility: boolean;
  shareProgress: boolean;
  allowMessaging: boolean;
}

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: true,
    reminders: false,
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: true,
    shareProgress: false,
    allowMessaging: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (setting: keyof NotificationSettings) => {
    setNotifications((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handlePrivacyChange = (setting: keyof PrivacySettings) => {
    setPrivacy((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      dispatch(showSnackbar({ message: 'Passwords do not match', severity: 'error' }));
      return;
    }

    try {
      // TODO: Implement profile update API call
      console.log('Updating profile:', { formData, notifications, privacy });
      dispatch(showSnackbar({ message: 'Profile updated successfully', severity: 'success' }));
      setIsEditing(false);
    } catch (error) {
      dispatch(showSnackbar({ 
        message: error instanceof Error ? error.message : 'Failed to update profile', 
        severity: 'error' 
      }));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Overview */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                margin: '0 auto 16px',
                bgcolor: 'primary.main',
              }}
            >
              <PersonIcon sx={{ fontSize: 60 }} />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Member since {new Date().toLocaleDateString()}
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </Button>
          </Paper>
        </Grid>

        {/* Profile Details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Profile Information
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
              </Grid>

              {isEditing && (
                <>
                  <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                    Change Password
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Current Password"
                        name="currentPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        InputProps={{
                          endAdornment: (
                            <Button
                              onClick={() => setShowPassword(!showPassword)}
                              sx={{ minWidth: 'auto' }}
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </Button>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="New Password"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Confirm New Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </Grid>
                </>
              )}

              {isEditing && (
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ minWidth: 120 }}
                  >
                    Save Changes
                  </Button>
                </Box>
              )}
            </Box>
          </Paper>

          {/* Notifications */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Notification Settings
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Email Notifications" />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={notifications.email}
                    onChange={() => handleNotificationChange('email')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Push Notifications" />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={notifications.push}
                    onChange={() => handleNotificationChange('push')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Daily Reminders" />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={notifications.reminders}
                    onChange={() => handleNotificationChange('reminders')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>

          {/* Privacy */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Privacy Settings
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Profile Visibility"
                  secondary="Allow others to see your profile"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={privacy.profileVisibility}
                    onChange={() => handlePrivacyChange('profileVisibility')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Share Progress"
                  secondary="Share your mental health progress with professionals"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={privacy.shareProgress}
                    onChange={() => handlePrivacyChange('shareProgress')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Direct Messaging"
                  secondary="Allow professionals to send you messages"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={privacy.allowMessaging}
                    onChange={() => handlePrivacyChange('allowMessaging')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>

          {/* Data Privacy Notice */}
          <Alert severity="info" sx={{ mt: 3 }}>
            Your privacy is important to us. We never share your personal information
            without your explicit consent. You can review our privacy policy for more details.
          </Alert>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 