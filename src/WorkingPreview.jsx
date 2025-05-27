import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  alpha,
  ThemeProvider,
  CssBaseline
} from '@mui/material';
import {
  AutoAwesome as AIIcon,
  PlayArrow as PlayIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { repSpheresTheme } from './theme/repSpheresTheme';
import { designTokens } from './styles/designTokens';

function WorkingPreview() {
  return (
    <ThemeProvider theme={repSpheresTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${designTokens.colors.background.primary} 0%, ${designTokens.colors.background.secondary} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 20% 50%, ${alpha(designTokens.colors.primary[500], 0.1)} 0%, transparent 50%),
                         radial-gradient(circle at 80% 80%, ${alpha(designTokens.colors.accent[500], 0.1)} 0%, transparent 50%)`,
            pointerEvents: 'none'
          }}
        />
        
        <Container maxWidth="xl" sx={{ pt: 8, position: 'relative', zIndex: 1 }}>
          {/* Hero Section */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Box
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto 3rem',
                borderRadius: '24px',
                background: `linear-gradient(135deg, ${designTokens.colors.primary[500]} 0%, ${designTokens.colors.accent[500]} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 20px 40px ${alpha(designTokens.colors.primary[500], 0.3)}`,
              }}
            >
              <AIIcon sx={{ color: 'white', fontSize: 60 }} />
            </Box>
            
            <Typography 
              variant="h2" 
              fontWeight="bold" 
              gutterBottom
              sx={{
                background: `linear-gradient(135deg, ${designTokens.colors.primary[400]} 0%, ${designTokens.colors.accent[400]} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              RepSpheres AI
            </Typography>
            
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
              AI-powered sales intelligence for medical professionals
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayIcon />}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  borderRadius: '16px',
                  background: `linear-gradient(135deg, ${designTokens.colors.accent[500]} 0%, ${designTokens.colors.accent[600]} 100%)`,
                  boxShadow: `0 8px 20px ${alpha(designTokens.colors.accent[500], 0.3)}`,
                }}
              >
                Start Free Trial
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<ViewIcon />}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  borderRadius: '16px',
                  borderColor: designTokens.colors.primary[400],
                  color: designTokens.colors.primary[400],
                }}
              >
                Watch Demo
              </Button>
            </Box>
          </Box>

          {/* Stats */}
          <Grid container spacing={3} sx={{ mb: 8 }}>
            {[
              { label: 'Faster Research', value: '10x' },
              { label: 'Conversion Rate', value: '+45%' },
              { label: 'Time Saved', value: '15h/week' },
              { label: 'ROI Increase', value: '3.2x' }
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: '16px',
                    backgroundColor: alpha(designTokens.colors.background.card, 0.6),
                    backdropFilter: 'blur(16px)',
                    border: `1px solid ${designTokens.colors.border.light}`,
                  }}
                >
                  <Typography variant="h3" fontWeight="bold" color="primary">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Features */}
          <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>
            Built for Sales Excellence
          </Typography>
          <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
            Everything you need to dominate medical sales
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                title: 'AI-Powered Intelligence',
                description: 'Deep research and insights powered by advanced AI models',
                color: designTokens.colors.primary[500]
              },
              {
                title: 'Smart Workspace',
                description: 'Kanban-style campaign management with real-time tracking',
                color: designTokens.colors.accent[500]
              },
              {
                title: 'Advanced Analytics',
                description: 'Interactive visualizations and performance metrics',
                color: designTokens.colors.success[500]
              },
              {
                title: 'CRM Integration',
                description: 'Seamless sync with Salesforce, HubSpot, and more',
                color: designTokens.colors.primary[400]
              }
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: '16px',
                    backgroundColor: alpha(designTokens.colors.background.card, 0.6),
                    backdropFilter: 'blur(16px)',
                    border: `1px solid ${designTokens.colors.border.light}`,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: feature.color,
                      boxShadow: `0 20px 40px ${alpha(feature.color, 0.3)}`,
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        margin: '0 auto 2rem',
                        borderRadius: '16px',
                        backgroundColor: alpha(feature.color, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <AIIcon sx={{ fontSize: 40, color: feature.color }} />
                    </Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default WorkingPreview;