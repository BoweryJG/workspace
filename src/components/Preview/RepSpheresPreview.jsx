import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  IconButton,
  alpha,
  ThemeProvider,
  CssBaseline,
  Paper,
  useTheme
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Visibility as ViewIcon,
  AutoAwesome as AIIcon,
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  Campaign as CampaignIcon,
  Cloud as CloudIcon,
  Speed as SpeedIcon,
  TrendingUp as TrendingIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { repSpheresTheme } from '../../theme/repSpheresTheme';
import { designTokens } from '../../styles/designTokens';

// Import actual components for live preview
import DoctorSearchInput from '../IntelligentInputs/DoctorSearchInput';
import LocationPicker from '../IntelligentInputs/LocationPicker';
import ReportGenerationUI from '../ReportGeneration/ReportGenerationUI';

const AnimatedBackground = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      background: `linear-gradient(135deg, ${designTokens.colors.background.primary} 0%, ${designTokens.colors.background.secondary} 100%)`,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 20% 50%, ${alpha(designTokens.colors.primary[500], 0.1)} 0%, transparent 50%),
                     radial-gradient(circle at 80% 80%, ${alpha(designTokens.colors.accent[500], 0.1)} 0%, transparent 50%)`,
      }
    }}
  />
);

const FeatureCard = ({ icon, title, description, color }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <Card
      sx={{
        height: '100%',
        borderRadius: designTokens.borderRadius.xl,
        backgroundColor: alpha(designTokens.colors.background.card, 0.6),
        backdropFilter: `blur(${designTokens.blur.md})`,
        border: `1px solid ${designTokens.colors.border.light}`,
        transition: `all ${designTokens.animation.duration.base} ${designTokens.animation.easing.inOut}`,
        '&:hover': {
          borderColor: color || designTokens.colors.primary[500],
          boxShadow: `0 0 30px ${alpha(color || designTokens.colors.primary[500], 0.3)}`,
        }
      }}
    >
      <CardContent sx={{ textAlign: 'center', p: 4 }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            margin: '0 auto 2rem',
            borderRadius: designTokens.borderRadius.xl,
            background: `linear-gradient(135deg, ${alpha(color || designTokens.colors.primary[500], 0.2)} 0%, ${alpha(color || designTokens.colors.primary[600], 0.1)} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color || designTokens.colors.primary[500],
            fontSize: 40,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  </motion.div>
);

const RepSpheresPreview = () => {
  const [activeDemo, setActiveDemo] = useState('search');
  const [isGenerating, setIsGenerating] = useState(false);

  const features = [
    {
      icon: <AIIcon sx={{ fontSize: 'inherit' }} />,
      title: 'AI-Powered Intelligence',
      description: 'Deep research and insights powered by advanced AI models',
      color: designTokens.colors.primary[500]
    },
    {
      icon: <DashboardIcon sx={{ fontSize: 'inherit' }} />,
      title: 'Smart Workspace',
      description: 'Kanban-style campaign management with real-time tracking',
      color: designTokens.colors.accent[500]
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 'inherit' }} />,
      title: 'Advanced Analytics',
      description: 'Interactive visualizations and performance metrics',
      color: designTokens.colors.success[500]
    },
    {
      icon: <CloudIcon sx={{ fontSize: 'inherit' }} />,
      title: 'CRM Integration',
      description: 'Seamless sync with Salesforce, HubSpot, and more',
      color: designTokens.colors.primary[400]
    }
  ];

  const stats = [
    { label: 'Faster Research', value: '10x', icon: <SpeedIcon /> },
    { label: 'Conversion Rate', value: '+45%', icon: <TrendingIcon /> },
    { label: 'Time Saved', value: '15h/week', icon: <CheckIcon /> },
    { label: 'ROI Increase', value: '3.2x', icon: <AIIcon /> }
  ];

  return (
    <ThemeProvider theme={repSpheresTheme}>
      <CssBaseline />
      <AnimatedBackground />
      
      <Box sx={{ minHeight: '100vh', pb: 8 }}>
        {/* Hero Section */}
        <Container maxWidth="xl" sx={{ pt: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  margin: '0 auto 3rem',
                  borderRadius: designTokens.borderRadius.xl,
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
                The AI-powered sales intelligence platform that transforms how medical sales teams 
                research doctors, build relationships, and close deals
              </Typography>

              <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayIcon />}
                  sx={{
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    borderRadius: designTokens.borderRadius.xl,
                    background: `linear-gradient(135deg, ${designTokens.colors.accent[500]} 0%, ${designTokens.colors.accent[600]} 100%)`,
                    boxShadow: `0 8px 20px ${alpha(designTokens.colors.accent[500], 0.3)}`,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 12px 30px ${alpha(designTokens.colors.accent[500], 0.4)}`,
                    }
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
                    borderRadius: designTokens.borderRadius.xl,
                    borderColor: designTokens.colors.primary[400],
                    color: designTokens.colors.primary[400],
                    '&:hover': {
                      borderColor: designTokens.colors.primary[300],
                      backgroundColor: alpha(designTokens.colors.primary[500], 0.05),
                    }
                  }}
                >
                  Watch Demo
                </Button>
              </Box>
            </Box>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Grid container spacing={3} sx={{ mb: 8 }}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Paper
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      borderRadius: designTokens.borderRadius.xl,
                      backgroundColor: alpha(designTokens.colors.background.card, 0.6),
                      backdropFilter: `blur(${designTokens.blur.md})`,
                      border: `1px solid ${designTokens.colors.border.light}`,
                    }}
                  >
                    <Box sx={{ color: designTokens.colors.primary[500], mb: 1 }}>
                      {stat.icon}
                    </Box>
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
          </motion.div>

          {/* Live Demo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Box sx={{ mb: 8 }}>
              <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>
                Experience the Power
              </Typography>
              <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
                Try our intelligent components live
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 4 }}>
                <Chip
                  label="Doctor Search"
                  onClick={() => setActiveDemo('search')}
                  sx={{
                    px: 3,
                    py: 1,
                    fontSize: '1rem',
                    backgroundColor: activeDemo === 'search' 
                      ? alpha(designTokens.colors.primary[500], 0.2)
                      : alpha(designTokens.colors.background.card, 0.6),
                    borderColor: activeDemo === 'search'
                      ? designTokens.colors.primary[500]
                      : designTokens.colors.border.light,
                    cursor: 'pointer',
                  }}
                  variant="outlined"
                />
                <Chip
                  label="Location Intelligence"
                  onClick={() => setActiveDemo('location')}
                  sx={{
                    px: 3,
                    py: 1,
                    fontSize: '1rem',
                    backgroundColor: activeDemo === 'location' 
                      ? alpha(designTokens.colors.primary[500], 0.2)
                      : alpha(designTokens.colors.background.card, 0.6),
                    borderColor: activeDemo === 'location'
                      ? designTokens.colors.primary[500]
                      : designTokens.colors.border.light,
                    cursor: 'pointer',
                  }}
                  variant="outlined"
                />
                <Chip
                  label="AI Generation"
                  onClick={() => setActiveDemo('generation')}
                  sx={{
                    px: 3,
                    py: 1,
                    fontSize: '1rem',
                    backgroundColor: activeDemo === 'generation' 
                      ? alpha(designTokens.colors.primary[500], 0.2)
                      : alpha(designTokens.colors.background.card, 0.6),
                    borderColor: activeDemo === 'generation'
                      ? designTokens.colors.primary[500]
                      : designTokens.colors.border.light,
                    cursor: 'pointer',
                  }}
                  variant="outlined"
                />
              </Box>

              <Card
                sx={{
                  maxWidth: 800,
                  mx: 'auto',
                  borderRadius: designTokens.borderRadius.xl,
                  backgroundColor: alpha(designTokens.colors.background.card, 0.6),
                  backdropFilter: `blur(${designTokens.blur.md})`,
                  border: `1px solid ${designTokens.colors.border.light}`,
                  overflow: 'visible',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {activeDemo === 'search' && (
                    <Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Intelligent Doctor Search
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Search with auto-complete, verification badges, and rich profiles
                      </Typography>
                      <DoctorSearchInput />
                    </Box>
                  )}
                  
                  {activeDemo === 'location' && (
                    <Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Smart Location Picker
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Geographic intelligence with medical facility data
                      </Typography>
                      <LocationPicker />
                    </Box>
                  )}
                  
                  {activeDemo === 'generation' && (
                    <Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        AI Report Generation
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Real-time progress with live intelligence feed
                      </Typography>
                      <Box sx={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}>
                        <ReportGenerationUI
                          isGenerating={isGenerating}
                          onStart={() => setIsGenerating(true)}
                          onStop={() => setIsGenerating(false)}
                          onComplete={() => setIsGenerating(false)}
                        />
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Box>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Box sx={{ mb: 8 }}>
              <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>
                Built for Sales Excellence
              </Typography>
              <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
                Everything you need to dominate medical sales
              </Typography>

              <Grid container spacing={4}>
                {features.map((feature, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <FeatureCard {...feature} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card
              sx={{
                p: 6,
                textAlign: 'center',
                borderRadius: designTokens.borderRadius.xl,
                background: `linear-gradient(135deg, ${alpha(designTokens.colors.primary[500], 0.1)} 0%, ${alpha(designTokens.colors.accent[500], 0.1)} 100%)`,
                border: `1px solid ${designTokens.colors.primary[500]}`,
              }}
            >
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Ready to Transform Your Sales Process?
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Join leading medical sales teams using RepSpheres AI
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  borderRadius: designTokens.borderRadius.xl,
                  background: `linear-gradient(135deg, ${designTokens.colors.primary[500]} 0%, ${designTokens.colors.primary[600]} 100%)`,
                  boxShadow: `0 8px 30px ${alpha(designTokens.colors.primary[500], 0.4)}`,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 12px 40px ${alpha(designTokens.colors.primary[500], 0.5)}`,
                  }
                }}
              >
                Get Started Now
              </Button>
            </Card>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default RepSpheresPreview;