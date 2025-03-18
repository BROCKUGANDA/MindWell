import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Book as BookIcon,
  OndemandVideo as VideoIcon,
  Article as ArticleIcon,
  Podcasts as PodcastIcon,
  LocalHospital as MedicalIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'book' | 'podcast' | 'medical' | 'therapy';
  url: string;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Understanding Anxiety',
    description: 'A comprehensive guide to understanding and managing anxiety symptoms.',
    type: 'article',
    url: '#',
  },
  {
    id: '2',
    title: 'Mindfulness Meditation Basics',
    description: 'Learn the fundamentals of mindfulness meditation with guided sessions.',
    type: 'video',
    url: '#',
  },
  {
    id: '3',
    title: 'The Power of Self-Compassion',
    description: 'Explore how self-compassion can improve mental well-being.',
    type: 'book',
    url: '#',
  },
  {
    id: '4',
    title: 'Mental Health Stories',
    description: 'Real stories from people sharing their mental health journeys.',
    type: 'podcast',
    url: '#',
  },
  {
    id: '5',
    title: 'Finding Professional Help',
    description: 'Guide to finding and choosing mental health professionals.',
    type: 'medical',
    url: '#',
  },
  {
    id: '6',
    title: 'Online Therapy Options',
    description: 'Overview of available online therapy platforms and services.',
    type: 'therapy',
    url: '#',
  },
];

const getIcon = (type: Resource['type']) => {
  switch (type) {
    case 'article':
      return <ArticleIcon />;
    case 'video':
      return <VideoIcon />;
    case 'book':
      return <BookIcon />;
    case 'podcast':
      return <PodcastIcon />;
    case 'medical':
      return <MedicalIcon />;
    case 'therapy':
      return <PsychologyIcon />;
    default:
      return <ArticleIcon />;
  }
};

const Resources: React.FC = () => {
  const emergencyContacts = [
    {
      name: 'National Crisis Hotline',
      number: '988',
      description: '24/7 suicide and crisis lifeline',
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: '24/7 crisis counseling via text',
    },
    {
      name: 'SAMHSA National Helpline',
      number: '1-800-662-4357',
      description: 'Treatment referral and information service',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Emergency Resources */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Emergency Resources
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          If you're experiencing a mental health emergency, please contact one of these services immediately:
        </Typography>
        <List>
          {emergencyContacts.map((contact, index) => (
            <React.Fragment key={contact.name}>
              <ListItem>
                <ListItemIcon>
                  <MedicalIcon color="error" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="h6" component="span">
                      {contact.name}: <strong>{contact.number}</strong>
                    </Typography>
                  }
                  secondary={contact.description}
                />
              </ListItem>
              {index < emergencyContacts.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Educational Resources */}
      <Typography variant="h4" gutterBottom>
        Educational Resources
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Explore our curated collection of mental health resources:
      </Typography>
      <Grid container spacing={3}>
        {resources.map((resource) => (
          <Grid item xs={12} sm={6} md={4} key={resource.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {getIcon(resource.type)}
                  <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                    {resource.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {resource.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" href={resource.url} target="_blank">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Additional Information */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Disclaimer
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The resources provided here are for informational purposes only and should not be considered as
          a substitute for professional medical advice. Always consult with qualified healthcare
          providers regarding any mental health concerns.
        </Typography>
      </Box>
    </Container>
  );
};

export default Resources; 