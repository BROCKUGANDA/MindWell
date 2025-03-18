import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  CircularProgress,
  Divider,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../store/slices/uiSlice';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
}

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your mental health support assistant. How can I help you today?',
      sender: 'assistant',
      timestamp: new Date().toISOString(),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage('');
    setLoading(true);

    try {
      // TODO: Implement API call to get AI response
      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I understand how you\'re feeling. Would you like to tell me more about what\'s on your mind?',
        sender: 'assistant',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, response]);
    } catch (error) {
      dispatch(showSnackbar({ 
        message: error instanceof Error ? error.message : 'Failed to get response', 
        severity: 'error' 
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
        {/* Chat Header */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">Mental Health Support Chat</Typography>
          <Typography variant="body2" color="text.secondary">
            Chat with our AI assistant for support and guidance
          </Typography>
        </Box>

        {/* Messages */}
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          <List>
            {messages.map((msg, index) => (
              <React.Fragment key={msg.id}>
                <ListItem
                  sx={{
                    flexDirection: 'column',
                    alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      maxWidth: '70%',
                      flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: msg.sender === 'user' ? 'primary.main' : 'secondary.main',
                        mx: 1,
                      }}
                    >
                      {msg.sender === 'user' ? 'U' : 'AI'}
                    </Avatar>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        bgcolor: msg.sender === 'user' ? 'primary.light' : 'grey.100',
                        borderRadius: 2,
                      }}
                    >
                      <ListItemText
                        primary={msg.content}
                        secondary={new Date(msg.timestamp).toLocaleTimeString()}
                        sx={{
                          '& .MuiListItemText-primary': {
                            color: msg.sender === 'user' ? 'white' : 'text.primary',
                          },
                          '& .MuiListItemText-secondary': {
                            color: msg.sender === 'user' ? 'white' : 'text.secondary',
                          },
                        }}
                      />
                    </Paper>
                  </Box>
                </ListItem>
                {index < messages.length - 1 && (
                  <Divider variant="middle" sx={{ my: 1 }} />
                )}
              </React.Fragment>
            ))}
          </List>
          <div ref={messagesEndRef} />
        </Box>

        {/* Message Input */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
              multiline
              maxRows={4}
              sx={{ flexGrow: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={loading || !message.trim()}
              sx={{ minWidth: 100 }}
            >
              {loading ? <CircularProgress size={24} /> : <SendIcon />}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat;
