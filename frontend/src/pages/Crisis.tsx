import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  AlertTitle,
} from '@mui/material';
import {
  LocalHospital as EmergencyIcon,
  Phone as PhoneIcon,
  Message as MessageIcon,
  LocationOn as LocationIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const Crisis: React.FC = () => {
  const emergencyContacts = [
    {
      name: '911',
      description: 'For immediate life-threatening emergencies',
      icon: <EmergencyIcon color="error" />,
      action: 'Call 911',
      phone: '911',
    },
    {
      name: 'National Crisis Hotline',
      description: '24/7 suicide and crisis lifeline',
      icon: <PhoneIcon color="primary" />,
      action: 'Call 988',
      phone: '988',
    },
    {
      name: 'Crisis Text Line',
      description: '24/7 crisis counseling via text',
      icon: <MessageIcon color="primary" />,
      action: 'Text HOME to 741741',
      phone: '741741',
    },
    {
      name: 'SAMHSA National Helpline',
      description: 'Treatment referral and information service (24/7)',
      icon: <PhoneIcon color="primary" />,
      action: 'Call 1-800-662-4357',
      phone: '18006624357',
    },
  ];

  const safetySteps = [
    'Find a safe place - If you\'re in danger, get to a secure location',
    'Take deep breaths - Try to stay calm and focused',
    'Reach out - Contact emergency services or crisis hotlines',
    'Stay connected - Let someone you trust know what\'s happening',
    'Follow professional guidance - Listen to emergency responders',
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Emergency Alert */}
      <Alert severity="error" sx={{ mb: 4 }}>
        <AlertTitle>If you're in immediate danger, call 911 or your local emergency number</AlertTitle>
        Your safety is our top priority. Don't hesitate to seek immediate help.
      </Alert>

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Emergency Contacts */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'error.main' }}>
              Emergency Contacts
            </Typography>
            <List>
              {emergencyContacts.map((contact, index) => (
                <React.Fragment key={contact.name}>
                  <ListItem>
                    <ListItemIcon>{contact.icon}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h6">
                          {contact.name}
                        </Typography>
                      }
                      secondary={contact.description}
                    />
                    <Button
                      variant="contained"
                      color={contact.name === '911' ? 'error' : 'primary'}
                      href={`tel:${contact.phone}`}
                      startIcon={<PhoneIcon />}
                    >
                      {contact.action}
                    </Button>
                  </ListItem>
                  {index < emergencyContacts.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>

          {/* Immediate Steps */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Immediate Steps to Take
            </Typography>
            <List>
              {safetySteps.map((step, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" />
                    </ListItemIcon>
                    <ListItemText primary={step} />
                  </ListItem>
                  {index < safetySteps.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Local Resources */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Find Local Help
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" paragraph>
                It's important to know your local emergency resources. Here's how to find help in your area:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <LocationIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Nearest Emergency Room" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Local Crisis Centers" />
                </ListItem>
              </List>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<LocationIcon />}
                sx={{ mt: 2 }}
              >
                Find Nearby Services
              </Button>
            </Box>

            <Typography variant="h6" gutterBottom>
              Important Note
            </Typography>
            <Typography variant="body2" color="text.secondary">
              If you're experiencing thoughts of suicide or self-harm, please reach out immediately.
              You're not alone, and help is available 24/7. Your life matters, and there are people
              who want to help.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Crisis; 