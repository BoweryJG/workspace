import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  IconButton,
  Chip,
  alpha,
  ThemeProvider,
  CssBaseline
} from '@mui/material';
import {
  Visibility as ViewIcon,
  VisibilityOff as HideIcon,
  AutoAwesome as AIIcon,
  Rocket as LaunchIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { repSpheresTheme } from '../theme/repSpheresTheme';
import { designTokens } from '../styles/designTokens';

// Import components
import DoctorSearchInput from './IntelligentInputs/DoctorSearchInput';
import LocationPicker from './IntelligentInputs/LocationPicker';
import ProductSelector from './IntelligentInputs/ProductSelector';
import ReportGenerationUI from './ReportGeneration/ReportGenerationUI';
import WorkspaceDashboard from './Workspace/WorkspaceDashboard';

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

const ShowcaseDemo = () => {
  const [showOriginal, setShowOriginal] = useState(false);
  const [activeDemo, setActiveDemo] = useState('dashboard');
  const [doctorValue, setDoctorValue] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [productValue, setProductValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const demos = [
    { id: 'dashboard', label: 'Workspace Dashboard', icon: '📊' },
    { id: 'doctor-search', label: 'Doctor Search', icon: '👨‍⚕️' },
    { id: 'location', label: 'Location Picker', icon: '📍' },
    { id: 'product', label: 'Product Selector', icon: '💊' },
    { id: 'generation', label: 'Report Generation', icon: '⚡' },
  ];

  const renderDemo = () => {
    switch (activeDemo) {
      case 'dashboard':
        return <WorkspaceDashboard />;
      
      case 'doctor-search':
        return (
          <Box sx={{ maxWidth: 800, mx: 'auto', p: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Intelligent Doctor Search
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              AI-powered search with auto-complete, verification badges, and rich metadata
            </Typography>
            <DoctorSearchInput
              value={doctorValue}
              onChange={setDoctorValue}
              onSelect={(doctor) => console.log('Selected doctor:', doctor)}
            />
          </Box>
        );
      
      case 'location':
        return (
          <Box sx={{ maxWidth: 800, mx: 'auto', p: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Smart Location Picker
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Geographic intelligence with medical facility data and territory insights
            </Typography>
            <LocationPicker
              value={locationValue}
              onChange={setLocationValue}
              onSelect={(location) => console.log('Selected location:', location)}
            />
          </Box>
        );
      
      case 'product':
        return (
          <Box sx={{ maxWidth: 1200, mx: 'auto', p: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Visual Product Selector
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Browse medical devices and pharmaceuticals with rich visual cards
            </Typography>
            <ProductSelector
              value={productValue}
              onChange={setProductValue}
              onSelect={(product) => console.log('Selected product:', product)}
            />
          </Box>
        );
      
      case 'generation':
        return (
          <Box sx={{ maxWidth: 1000, mx: 'auto', p: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              AI Report Generation
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Real-time progress visualization with live intelligence feed
            </Typography>
            <ReportGenerationUI
              isGenerating={isGenerating}
              onStart={() => setIsGenerating(true)}
              onStop={() => setIsGenerating(false)}
              onComplete={() => setIsGenerating(false)}
              reportData={{}}
            />
          </Box>
        );
      
      default:
        return null;
    }
  };

  if (showOriginal) {
    // Redirect to original app
    window.location.href = '/index-original.html';
    return null;
  }

  return (
    <ThemeProvider theme={repSpheresTheme}>
      <CssBaseline />
      <AnimatedBackground />
      
      <Box sx={{ minHeight: '100vh', pb: 8 }}>
        {/* Header */}
        <Box
          sx={{
            backgroundColor: alpha(designTokens.colors.background.secondary, 0.8),
            backdropFilter: `blur(${designTokens.blur.xl})`,
            borderBottom: `1px solid ${designTokens.colors.border.light}`,
            p: 3,
            position: 'sticky',
            top: 0,
            zIndex: 1000,
          }}
        >
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: designTokens.borderRadius.lg,
                    background: `linear-gradient(135deg, ${designTokens.colors.primary[500]} 0%, ${designTokens.colors.accent[500]} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AIIcon sx={{ color: 'white', fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    RepSpheres UI/UX Redesign
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Next-generation sales intelligence platform
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<ViewIcon />}
                  onClick={() => setShowOriginal(true)}
                  sx={{ borderRadius: designTokens.borderRadius.lg }}
                >
                  View Original
                </Button>
                <Button
                  variant="contained"
                  startIcon={<LaunchIcon />}
                  href="#"
                  sx={{
                    borderRadius: designTokens.borderRadius.lg,
                    background: `linear-gradient(135deg, ${designTokens.colors.accent[500]} 0%, ${designTokens.colors.accent[600]} 100%)`,
                  }}
                >
                  Launch Full App
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Demo Navigation */}
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
            {demos.map((demo) => (
              <motion.div
                key={demo.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Chip
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>{demo.icon}</span>
                      <span>{demo.label}</span>
                    </Box>
                  }
                  onClick={() => setActiveDemo(demo.id)}
                  sx={{
                    px: 3,
                    py: 1,
                    fontSize: '1rem',
                    borderRadius: designTokens.borderRadius.lg,
                    backgroundColor: activeDemo === demo.id 
                      ? alpha(designTokens.colors.primary[500], 0.2)
                      : alpha(designTokens.colors.background.card, 0.6),
                    border: `1px solid ${
                      activeDemo === demo.id 
                        ? designTokens.colors.primary[500]
                        : designTokens.colors.border.light
                    }`,
                    color: activeDemo === demo.id 
                      ? designTokens.colors.primary[300]
                      : designTokens.colors.text.primary,
                    cursor: 'pointer',
                    transition: `all ${designTokens.animation.duration.fast} ${designTokens.animation.easing.inOut}`,
                    '&:hover': {
                      backgroundColor: alpha(designTokens.colors.primary[500], 0.1),
                      borderColor: designTokens.colors.primary[400],
                    }
                  }}
                />
              </motion.div>
            ))}
          </Box>

          {/* Demo Content */}
          <Paper
            sx={{
              borderRadius: designTokens.borderRadius.xl,
              backgroundColor: alpha(designTokens.colors.background.card, 0.3),
              backdropFilter: `blur(${designTokens.blur.md})`,
              border: `1px solid ${designTokens.colors.border.light}`,
              overflow: 'hidden',
              minHeight: 600,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDemo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderDemo()}
              </motion.div>
            </AnimatePresence>
          </Paper>

          {/* Key Features */}
          <Box sx={{ mt: 8 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
              Key Design Features
            </Typography>
            <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
              Built for category domination in AI-powered sales intelligence
            </Typography>

            <Grid container spacing={4}>
              {[
                {
                  title: 'AI-First Design',
                  description: 'Every interface prioritizes intelligent data insights and actionable recommendations',
                  color: designTokens.colors.primary[500],
                },
                {
                  title: 'Immersive Experience',
                  description: 'Spatial design, fluid animations, and visual depth create engaging interactions',
                  color: designTokens.colors.accent[500],
                },
                {
                  title: 'Enterprise Ready',
                  description: 'Scalable architecture with CRM integrations and bulk operations',
                  color: designTokens.colors.success[500],
                },
                {
                  title: 'Real-time Intelligence',
                  description: 'Live progress tracking, quality scoring, and confidence metrics',
                  color: designTokens.colors.primary[400],
                },
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Paper
                      sx={{
                        p: 3,
                        height: '100%',
                        borderRadius: designTokens.borderRadius.xl,
                        backgroundColor: alpha(designTokens.colors.background.card, 0.6),
                        backdropFilter: `blur(${designTokens.blur.md})`,
                        border: `1px solid ${designTokens.colors.border.light}`,
                        borderTop: `4px solid ${feature.color}`,
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ShowcaseDemo;