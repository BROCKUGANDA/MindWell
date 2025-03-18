import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  MenuItem,
  Avatar,
  Chip,
  Rating,
  Paper,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Verified as VerifiedIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';

interface Professional {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  available: boolean;
  verified: boolean;
  imageUrl: string;
}

const professionals: Professional[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'Clinical Psychologist',
    specialties: ['Anxiety', 'Depression', 'Trauma'],
    rating: 4.8,
    reviews: 124,
    location: 'New York, NY',
    distance: '2.5 miles',
    available: true,
    verified: true,
    imageUrl: '',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    title: 'Psychiatrist',
    specialties: ['ADHD', 'Bipolar Disorder', 'Anxiety'],
    rating: 4.9,
    reviews: 98,
    location: 'New York, NY',
    distance: '3.2 miles',
    available: true,
    verified: true,
    imageUrl: '',
  },
  {
    id: '3',
    name: 'Lisa Anderson',
    title: 'Licensed Therapist',
    specialties: ['Relationships', 'Stress', 'Self-esteem'],
    rating: 4.7,
    reviews: 156,
    location: 'New York, NY',
    distance: '1.8 miles',
    available: false,
    verified: true,
    imageUrl: '',
  },
];

const specialties = [
  'Anxiety',
  'Depression',
  'ADHD',
  'Trauma',
  'Relationships',
  'Stress',
  'Addiction',
  'Grief',
  'Self-esteem',
  'Bipolar Disorder',
];

const Professionals: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Search params:', { searchTerm, specialty, location });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom>
        Find Mental Health Professionals
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Connect with licensed therapists, counselors, and psychiatrists in your area
      </Typography>

      {/* Search Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              select
              label="Specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            >
              <MenuItem value="">All Specialties</MenuItem>
              {specialties.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Paper>

      {/* Results */}
      <Grid container spacing={3}>
        {professionals.map((professional) => (
          <Grid item xs={12} md={6} lg={4} key={professional.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={professional.imageUrl}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  >
                    <PsychologyIcon />
                  </Avatar>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h6" component="div">
                        {professional.name}
                      </Typography>
                      {professional.verified && (
                        <VerifiedIcon
                          color="primary"
                          sx={{ ml: 1, fontSize: 20 }}
                        />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {professional.title}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  {professional.specialties.map((specialty) => (
                    <Chip
                      key={specialty}
                      label={specialty}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={professional.rating} precision={0.1} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({professional.reviews} reviews)
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationIcon fontSize="small" color="action" />
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    {professional.location} • {professional.distance}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={!professional.available}
                >
                  {professional.available ? 'Schedule Consultation' : 'Not Available'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Additional Information */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Why Choose Our Platform?
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • All professionals are licensed and verified
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • Secure and confidential consultations
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • Flexible scheduling options
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Insurance coverage available for eligible providers
        </Typography>
      </Paper>
    </Container>
  );
};

export default Professionals; 