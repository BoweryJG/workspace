import React, { useState } from 'react';
import {
  Box,
  Container,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  Fade,
  alpha,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Tabs,
  Tab,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Divider
} from '@mui/material';
import {
  AutoAwesome as AIIcon,
  Dashboard as DashboardIcon,
  Assignment as ReportIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  AccountCircle as ProfileIcon,
  Campaign as CampaignIcon,
  Cloud as CloudIcon,
  Logout as LogoutIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { repSpheresTheme } from '../theme/repSpheresTheme';
import { designTokens } from '../styles/designTokens';

// Import new components
import DoctorSearchInput from './IntelligentInputs/DoctorSearchInput';
import LocationPicker from './IntelligentInputs/LocationPicker';
import ProductSelector from './IntelligentInputs/ProductSelector';
import ReportGenerationUI from './ReportGeneration/ReportGenerationUI';
import WorkspaceDashboard from './Workspace/WorkspaceDashboard';
import AnalyticsInsightsCenter from './Analytics/AnalyticsInsightsCenter';
import RelationshipGraph3D from './Visualization/RelationshipGraph3D';
import CampaignOrchestrator from './Campaign/CampaignOrchestrator';
import CRMIntegration from './Integration/CRMIntegration';

// Background component
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

const RepSpheresApp = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    doctor: '',
    location: '',
    product: '',
    timeframe: '6 months',
    reportType: 'comprehensive'
  });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [notifications] = useState([
    { id: 1, message: 'New AI report ready for Dr. Johnson', time: '5m ago' },
    { id: 2, message: 'Campaign "Q1 Cardiology" completed', time: '1h ago' },
    { id: 3, message: 'CRM sync successful - 45 records updated', time: '2h ago' },
    { id: 4, message: 'New product launch briefing available', time: '1d ago' }
  ]);

  const steps = [
    {
      label: 'Doctor Information',
      description: 'Search and select the doctor you want to research',
    },
    {
      label: 'Location & Territory',
      description: 'Specify the geographic area for your analysis',
    },
    {
      label: 'Product Selection',
      description: 'Choose the medical device or pharmaceutical product',
    },
    {
      label: 'Generate Intelligence',
      description: 'AI-powered deep research and report generation',
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      doctor: '',
      location: '',
      product: '',
      timeframe: '6 months',
      reportType: 'comprehensive'
    });
    setSelectedDoctor(null);
    setSelectedLocation(null);
    setSelectedProduct(null);
  };

  const handleStartGeneration = () => {
    setIsGenerating(true);
  };

  const handleStopGeneration = () => {
    setIsGenerating(false);
  };

  const handleGenerationComplete = () => {
    setIsGenerating(false);
    // Handle completion logic
  };

  const tabContent = () => {
    switch (activeTab) {
      case 0: // Workspace
        return <WorkspaceDashboard />;
      
      case 1: // New Report
        return (
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Generate Sales Intelligence Report
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Create comprehensive doctor insights and personalized sales strategies
              </Typography>

              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      StepIconProps={{
                        sx: {
                          color: designTokens.colors.text.tertiary,
                          '&.Mui-active': {
                            color: designTokens.colors.primary[500],
                          },
                          '&.Mui-completed': {
                            color: designTokens.colors.success[500],
                          },
                        }
                      }}
                    >
                      <Typography variant="h6" fontWeight="medium">
                        {step.label}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {step.description}
                      </Typography>
                      
                      <Box sx={{ mb: 4 }}>
                        {index === 0 && (
                          <DoctorSearchInput
                            value={formData.doctor}
                            onChange={(value) => setFormData({ ...formData, doctor: value })}
                            onSelect={setSelectedDoctor}
                          />
                        )}
                        
                        {index === 1 && (
                          <LocationPicker
                            value={formData.location}
                            onChange={(value) => setFormData({ ...formData, location: value })}
                            onSelect={setSelectedLocation}
                          />
                        )}
                        
                        {index === 2 && (
                          <ProductSelector
                            value={formData.product}
                            onChange={(value) => setFormData({ ...formData, product: value })}
                            onSelect={setSelectedProduct}
                          />
                        )}
                        
                        {index === 3 && (
                          <ReportGenerationUI
                            isGenerating={isGenerating}
                            onStart={handleStartGeneration}
                            onStop={handleStopGeneration}
                            onComplete={handleGenerationComplete}
                            reportData={formData}
                          />
                        )}
                      </Box>

                      {index < 3 && (
                        <Box sx={{ mb: 2 }}>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{
                              mr: 1,
                              borderRadius: designTokens.borderRadius.lg,
                              background: `linear-gradient(135deg, ${designTokens.colors.primary[500]} 0%, ${designTokens.colors.primary[600]} 100%)`,
                            }}
                            disabled={
                              (index === 0 && !formData.doctor) ||
                              (index === 1 && !formData.location) ||
                              (index === 2 && !formData.product)
                            }
                          >
                            Continue
                          </Button>
                          <Button
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{ 
                              mr: 1,
                              borderRadius: designTokens.borderRadius.lg,
                            }}
                          >
                            Back
                          </Button>
                        </Box>
                      )}
                    </StepContent>
                  </Step>
                ))}
              </Stepper>

              {activeStep === steps.length && (
                <Paper 
                  square 
                  elevation={0} 
                  sx={{ 
                    p: 3,
                    backgroundColor: alpha(designTokens.colors.success[500], 0.1),
                    borderRadius: designTokens.borderRadius.lg,
                    border: `2px solid ${designTokens.colors.success[500]}`,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" color="success.main" gutterBottom>
                    Report Generated Successfully!
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Your comprehensive sales intelligence report is ready. You can now export it, send it to your CRM, or create targeted campaigns.
                  </Typography>
                  <Button 
                    onClick={handleReset} 
                    sx={{ 
                      mt: 1, 
                      mr: 1,
                      borderRadius: designTokens.borderRadius.lg,
                    }}
                  >
                    Generate Another Report
                  </Button>
                </Paper>
              )}
            </motion.div>
          </Container>
        );
      
      case 2: // Analytics
        return <AnalyticsInsightsCenter />;
      
      case 3: // Campaigns
        return (
          <Container maxWidth="xl" sx={{ py: 4, height: 'calc(100vh - 120px)' }}>
            <CampaignOrchestrator />
          </Container>
        );
      
      case 4: // Intelligence Graph
        return (
          <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Intelligence Network
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Visualize relationships between doctors, hospitals, and products
            </Typography>
            <RelationshipGraph3D />
          </Container>
        );
      
      case 5: // Integrations
        return <CRMIntegration />;
      
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={repSpheresTheme}>
      <CssBaseline />
      <AnimatedBackground />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* App Bar */}
        <AppBar 
          position="sticky" 
          elevation={0}
          sx={{
            backgroundColor: alpha(designTokens.colors.background.secondary, 0.8),
            backdropFilter: `blur(${designTokens.blur.xl})`,
            borderBottom: `1px solid ${designTokens.colors.border.light}`,
          }}
        >
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: designTokens.borderRadius.lg,
                  background: `linear-gradient(135deg, ${designTokens.colors.primary[500]} 0%, ${designTokens.colors.accent[500]} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AIIcon sx={{ color: 'white' }} />
              </Box>
              <Typography variant="h6" fontWeight="bold">
                RepSpheres
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Tabs 
                value={activeTab} 
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{
                  '& .MuiTab-root': {
                    color: designTokens.colors.text.secondary,
                    fontWeight: designTokens.typography.fontWeight.medium,
                    '&.Mui-selected': {
                      color: designTokens.colors.primary[400],
                    },
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: designTokens.colors.primary[400],
                    height: 3,
                    borderRadius: designTokens.borderRadius.full,
                  },
                }}
              >
                <Tab icon={<DashboardIcon />} label="Workspace" iconPosition="start" />
                <Tab icon={<ReportIcon />} label="New Report" iconPosition="start" />
                <Tab icon={<AnalyticsIcon />} label="Analytics" iconPosition="start" />
                <Tab icon={<CampaignIcon />} label="Campaigns" iconPosition="start" />
                <Tab icon={<AIIcon />} label="Intelligence" iconPosition="start" />
                <Tab icon={<CloudIcon />} label="Integrations" iconPosition="start" />
              </Tabs>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton color="inherit">
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <SettingsIcon />
              </IconButton>
              <IconButton 
                color="inherit"
                onClick={(e) => setProfileAnchor(e.currentTarget)}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: designTokens.colors.primary[500] }}>
                  JD
                </Avatar>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Profile Menu */}
        <Menu
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={() => setProfileAnchor(null)}
          PaperProps={{
            sx: {
              backgroundColor: alpha(designTokens.colors.background.secondary, 0.95),
              backdropFilter: `blur(${designTokens.blur.xl})`,
              border: `1px solid ${designTokens.colors.border.light}`,
              borderRadius: designTokens.borderRadius.lg,
              mt: 1,
            }
          }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2" fontWeight="bold">
              John Doe
            </Typography>
            <Typography variant="caption" color="text.secondary">
              john.doe@repspheres.com
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={() => setProfileAnchor(null)}>
            <PersonIcon sx={{ mr: 2, fontSize: 20 }} />
            Profile Settings
          </MenuItem>
          <MenuItem onClick={() => setProfileAnchor(null)}>
            <SettingsIcon sx={{ mr: 2, fontSize: 20 }} />
            Preferences
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => setProfileAnchor(null)}>
            <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
            Sign Out
          </MenuItem>
        </Menu>

        {/* Main Content */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <AnimatePresence mode="wait">
            <Fade in={true} timeout={300}>
              <Box>
                {tabContent()}
              </Box>
            </Fade>
          </AnimatePresence>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default RepSpheresApp;