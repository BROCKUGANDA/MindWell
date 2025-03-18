import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Slider,
  Button,
  TextField,
  Grid,
  Chip,
  Stack,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../store/slices/uiSlice';

const emotions = [
  'Happy',
  'Calm',
  'Excited',
  'Anxious',
  'Sad',
  'Stressed',
  'Energetic',
  'Tired',
  'Frustrated',
  'Grateful',
];

interface MoodEntry {
  mood: number;
  emotions: string[];
  note: string;
  date: string;
}

const MoodTracker: React.FC = () => {
  const dispatch = useDispatch();
  const [mood, setMood] = useState<number>(5);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [note, setNote] = useState('');

  const handleEmotionToggle = (emotion: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotion)
        ? prev.filter((e) => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleSubmit = async () => {
    const entry: MoodEntry = {
      mood,
      emotions: selectedEmotions,
      note,
      date: new Date().toISOString(),
    };

    try {
      // TODO: Implement API call to save mood entry
      console.log('Saving mood entry:', entry);
      dispatch(showSnackbar({ message: 'Mood tracked successfully!', severity: 'success' }));
      
      // Reset form
      setMood(5);
      setSelectedEmotions([]);
      setNote('');
    } catch (error) {
      dispatch(showSnackbar({ 
        message: error instanceof Error ? error.message : 'Failed to save mood entry', 
        severity: 'error' 
      }));
    }
  };

  const getMoodLabel = (value: number) => {
    const labels = [
      'Very Low',
      'Low',
      'Somewhat Low',
      'Neutral',
      'Somewhat Good',
      'Good',
      'Very Good',
    ];
    return labels[Math.floor((value / 10) * (labels.length - 1))];
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          How are you feeling today?
        </Typography>

        {/* Mood Slider */}
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Rate your mood
          </Typography>
          <Box sx={{ px: 2 }}>
            <Slider
              value={mood}
              onChange={(_, newValue) => setMood(newValue as number)}
              min={0}
              max={10}
              step={1}
              marks
              valueLabelDisplay="auto"
              valueLabelFormat={getMoodLabel}
              sx={{
                '& .MuiSlider-markLabel': {
                  fontSize: '0.875rem',
                },
              }}
            />
            <Typography variant="body1" align="center" sx={{ mt: 1 }}>
              {getMoodLabel(mood)}
            </Typography>
          </Box>
        </Box>

        {/* Emotions */}
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Select your emotions
          </Typography>
          <Grid container spacing={1}>
            {emotions.map((emotion) => (
              <Grid item key={emotion}>
                <Chip
                  label={emotion}
                  onClick={() => handleEmotionToggle(emotion)}
                  color={selectedEmotions.includes(emotion) ? 'primary' : 'default'}
                  sx={{ m: 0.5 }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Notes */}
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Add a note (optional)
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="How was your day? What made you feel this way?"
          />
        </Box>

        {/* Submit Button */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={!mood}
          >
            Track Mood
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default MoodTracker;
