import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid
} from '@mui/material';

// Simplified RepSpheresApp component to prevent build issues
const RepSpheresApp = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #A78BFA 0%, #67E8F9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          RepSpheres Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          AI-powered sales intelligence platform
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Doctor Intelligence
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Access comprehensive profiles and insights for healthcare professionals
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Market Analytics
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Real-time market trends and competitive intelligence
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sales Reports
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Generate AI-powered sales reports and recommendations
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Campaign Manager
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Plan and execute targeted marketing campaigns
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RepSpheresApp;