import React, { useState } from 'react';
import { 
  ThemeProvider, 
  CssBaseline, 
  Box, 
  Container,
  Typography, 
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Chip,
  LinearProgress,
  AppBar,
  Toolbar,
  IconButton,
  Alert,
  Fade
} from '@mui/material';
import { createTheme, alpha } from '@mui/material/styles';
import {
  AutoAwesome as AIIcon,
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Inventory as ProductIcon,
  PlayArrow as GenerateIcon,
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  Download as DownloadIcon
} from '@mui/icons-material';

// Custom theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8A74F9',
      light: '#B8A6FF',
      dark: '#6B5ED6',
    },
    secondary: {
      main: '#00D4FF',
      light: '#4DDDFF',
      dark: '#00A3CC',
    },
    background: {
      default: '#050511',
      paper: '#0A0A14',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
          backgroundColor: alpha('#0A0A14', 0.6),
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: alpha('#0A0A14', 0.4),
          },
        },
      },
    },
  },
});

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    doctorName: '',
    location: '',
    product: '',
    email: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  const steps = [
    {
      label: 'Doctor Information',
      icon: <SearchIcon />,
      description: 'Enter the doctor\'s name and details',
    },
    {
      label: 'Location',
      icon: <LocationIcon />,
      description: 'Specify the geographic area',
    },
    {
      label: 'Product Selection',
      icon: <ProductIcon />,
      description: 'Choose your medical product',
    },
    {
      label: 'Generate Report',
      icon: <GenerateIcon />,
      description: 'AI-powered analysis',
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
      doctorName: '',
      location: '',
      product: '',
      email: ''
    });
    setGeneratedReport(null);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedReport({
        doctorName: formData.doctorName,
        insights: [
          'High prescribing volume in cardiology specialty',
          'Key opinion leader in the local medical community',
          'Active in clinical research and publications',
          'Preferred morning meetings (8-10 AM)',
        ],
        recommendations: [
          'Schedule meeting through medical assistant',
          'Lead with clinical trial data',
          'Emphasize patient outcome improvements',
          'Prepare case studies from similar practices',
        ],
        score: 85
      });
      handleNext();
    }, 3000);
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 0: return formData.doctorName.length > 0;
      case 1: return formData.location.length > 0;
      case 2: return formData.product.length > 0;
      case 3: return true;
      default: return false;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
        {/* Background gradient */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(138, 116, 249, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        />

        {/* App Bar */}
        <AppBar position="static" elevation={0} sx={{ backgroundColor: 'transparent', backdropFilter: 'blur(20px)' }}>
          <Toolbar>
            <AIIcon sx={{ mr: 2, fontSize: 32 }} />
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
              RepSpheres AI
            </Typography>
            <Button color="inherit" startIcon={<DashboardIcon />}>Dashboard</Button>
            <Button color="inherit" startIcon={<AnalyticsIcon />}>Analytics</Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ py: 6 }}>
          {/* Hero Section */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" gutterBottom sx={{ 
              fontWeight: 800,
              background: 'linear-gradient(135deg, #8A74F9 0%, #00D4FF 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Sales Intelligence Platform
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
              AI-powered insights for medical sales professionals
            </Typography>
          </Box>

          {/* Main Content */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                      <Step key={step.label}>
                        <StepLabel
                          StepIconComponent={() => (
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                backgroundColor: activeStep >= index ? 'primary.main' : 'grey.800',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                              }}
                            >
                              {step.icon}
                            </Box>
                          )}
                        >
                          <Typography variant="h6">{step.label}</Typography>
                        </StepLabel>
                        <StepContent>
                          <Typography color="text.secondary" sx={{ mb: 3 }}>
                            {step.description}
                          </Typography>
                          
                          <Box sx={{ mb: 2 }}>
                            {index === 0 && (
                              <TextField
                                fullWidth
                                label="Doctor Name"
                                value={formData.doctorName}
                                onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                                placeholder="Dr. Sarah Johnson"
                                variant="outlined"
                              />
                            )}
                            
                            {index === 1 && (
                              <TextField
                                fullWidth
                                label="Location"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="New York, NY"
                                variant="outlined"
                              />
                            )}
                            
                            {index === 2 && (
                              <TextField
                                fullWidth
                                label="Product"
                                value={formData.product}
                                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                                placeholder="CardioFlow Pro X1"
                                variant="outlined"
                              />
                            )}
                            
                            {index === 3 && (
                              <Box>
                                {isGenerating ? (
                                  <Box sx={{ textAlign: 'center', py: 4 }}>
                                    <Typography variant="h6" gutterBottom>
                                      Generating AI-Powered Report...
                                    </Typography>
                                    <LinearProgress sx={{ mt: 2 }} />
                                  </Box>
                                ) : (
                                  <Alert severity="info">
                                    Ready to generate your personalized sales intelligence report for {formData.doctorName}
                                  </Alert>
                                )}
                              </Box>
                            )}
                          </Box>

                          <Box sx={{ mb: 2 }}>
                            {index < 3 && (
                              <>
                                <Button
                                  variant="contained"
                                  onClick={handleNext}
                                  disabled={!isStepComplete(index)}
                                  sx={{ mr: 1 }}
                                >
                                  Continue
                                </Button>
                                <Button
                                  disabled={index === 0}
                                  onClick={handleBack}
                                >
                                  Back
                                </Button>
                              </>
                            )}
                            {index === 3 && !generatedReport && (
                              <Button
                                variant="contained"
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                startIcon={<AIIcon />}
                                size="large"
                                sx={{
                                  background: 'linear-gradient(135deg, #8A74F9 0%, #00D4FF 100%)',
                                  '&:hover': {
                                    background: 'linear-gradient(135deg, #6B5ED6 0%, #00A3CC 100%)',
                                  }
                                }}
                              >
                                Generate Report
                              </Button>
                            )}
                          </Box>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>

                  {activeStep === steps.length && generatedReport && (
                    <Fade in={true}>
                      <Paper sx={{ p: 3, mt: 3, backgroundColor: alpha('#10B981', 0.1), border: '1px solid #10B981' }}>
                        <Typography variant="h5" gutterBottom sx={{ color: '#10B981' }}>
                          ✅ Report Generated Successfully!
                        </Typography>
                        
                        <Box sx={{ mt: 3 }}>
                          <Typography variant="h6" gutterBottom>
                            Doctor Profile: {generatedReport.doctorName}
                          </Typography>
                          
                          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                            Key Insights:
                          </Typography>
                          {generatedReport.insights.map((insight, i) => (
                            <Chip key={i} label={insight} sx={{ mr: 1, mb: 1 }} />
                          ))}
                          
                          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                            Recommendations:
                          </Typography>
                          {generatedReport.recommendations.map((rec, i) => (
                            <Typography key={i} variant="body2" sx={{ mb: 1 }}>
                              • {rec}
                            </Typography>
                          ))}
                        </Box>

                        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                          <Button 
                            variant="contained" 
                            startIcon={<DownloadIcon />}
                            sx={{ background: 'linear-gradient(135deg, #8A74F9 0%, #6B5ED6 100%)' }}
                          >
                            Export Report
                          </Button>
                          <Button onClick={handleReset}>
                            Generate Another
                          </Button>
                        </Box>
                      </Paper>
                    </Fade>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Stats Sidebar */}
            <Grid item xs={12} md={4}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Platform Stats
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h3" color="primary">10x</Typography>
                      <Typography variant="body2" color="text.secondary">Faster Research</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h3" color="secondary">+45%</Typography>
                      <Typography variant="body2" color="text.secondary">Conversion Rate</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h3" sx={{ color: '#10B981' }}>98%</Typography>
                      <Typography variant="body2" color="text.secondary">User Satisfaction</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Recent Reports
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {['Dr. Michael Chen', 'Dr. Emily Rodriguez', 'Dr. James Wilson'].map((name) => (
                      <Paper key={name} sx={{ p: 2, mb: 1, backgroundColor: 'background.default' }}>
                        <Typography variant="body2">{name}</Typography>
                        <Typography variant="caption" color="text.secondary">Generated 2 hours ago</Typography>
                      </Paper>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;