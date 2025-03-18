import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import { selectUser } from '../store/slices/authSlice';

const Dashboard: React.FC = () => {
  const user = useSelector(selectUser);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" gutterBottom>
              Welcome back, {user?.username || 'User'}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track your mental well-being and access support resources all in one place.
            </Typography>
          </Paper>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Mood Overview" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Your recent mood trends and patterns will appear here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Journal Preview */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Recent Journal Entries" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Your latest journal entries will be displayed here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Resources */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Support Resources" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Quick access to mental health resources and professional help.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Activity Timeline */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Your recent activities and interactions will be shown here.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
