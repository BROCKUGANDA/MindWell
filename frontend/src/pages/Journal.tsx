import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../store/slices/uiSlice';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood?: string;
}

const Journal: React.FC = () => {
  const dispatch = useDispatch();
  const [newEntry, setNewEntry] = useState({ title: '', content: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  // Mock data (will be replaced with API calls)
  const [entries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'A Productive Day',
      content: 'Today was quite productive. I managed to complete several tasks...',
      date: '2025-03-17T10:00:00Z',
      mood: 'Positive',
    },
    {
      id: '2',
      title: 'Reflecting on Changes',
      content: 'As I think about the recent changes in my life...',
      date: '2025-03-16T15:30:00Z',
      mood: 'Contemplative',
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.title || !newEntry.content) {
      dispatch(showSnackbar({ message: 'Please fill in all fields', severity: 'error' }));
      return;
    }

    try {
      // TODO: Implement API call to save journal entry
      console.log('Saving journal entry:', newEntry);
      dispatch(showSnackbar({ message: 'Journal entry saved successfully!', severity: 'success' }));
      setNewEntry({ title: '', content: '' });
    } catch (error) {
      dispatch(showSnackbar({ 
        message: error instanceof Error ? error.message : 'Failed to save journal entry', 
        severity: 'error' 
      }));
    }
  };

  const handleEdit = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setOpenDialog(true);
  };

  const handleDelete = async (entryId: string) => {
    try {
      // TODO: Implement API call to delete journal entry
      console.log('Deleting entry:', entryId);
      dispatch(showSnackbar({ message: 'Entry deleted successfully', severity: 'success' }));
    } catch (error) {
      dispatch(showSnackbar({ 
        message: error instanceof Error ? error.message : 'Failed to delete entry', 
        severity: 'error' 
      }));
    }
  };

  const handleUpdateEntry = async () => {
    if (!selectedEntry) return;

    try {
      // TODO: Implement API call to update journal entry
      console.log('Updating entry:', selectedEntry);
      dispatch(showSnackbar({ message: 'Entry updated successfully', severity: 'success' }));
      setOpenDialog(false);
    } catch (error) {
      dispatch(showSnackbar({ 
        message: error instanceof Error ? error.message : 'Failed to update entry', 
        severity: 'error' 
      }));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* New Entry Form */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Write a New Entry
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Title"
                margin="normal"
                value={newEntry.title}
                onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                required
              />
              <TextField
                fullWidth
                label="Content"
                multiline
                rows={4}
                margin="normal"
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Save Entry
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Journal Entries */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Your Journal Entries
          </Typography>
          <Grid container spacing={2}>
            {entries.map((entry) => (
              <Grid item xs={12} key={entry.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="h6">{entry.title}</Typography>
                        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                          {new Date(entry.date).toLocaleDateString()} - {entry.mood}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          {entry.content}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton onClick={() => handleEdit(entry)} size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(entry.id)} size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Journal Entry</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            value={selectedEntry?.title || ''}
            onChange={(e) => setSelectedEntry(prev => prev ? { ...prev, title: e.target.value } : null)}
          />
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={4}
            margin="normal"
            value={selectedEntry?.content || ''}
            onChange={(e) => setSelectedEntry(prev => prev ? { ...prev, content: e.target.value } : null)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateEntry} variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Journal;
