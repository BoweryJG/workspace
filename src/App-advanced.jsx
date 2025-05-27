import React, { useState, useEffect } from 'react';
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
  Fade,
  Autocomplete,
  Avatar,
  Stack,
  Tabs,
  Tab,
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Badge,
  Tooltip,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Collapse,
  Grow,
  Zoom
} from '@mui/material';
import { createTheme, alpha, styled } from '@mui/material/styles';
import {
  AutoAwesome as AIIcon,
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Inventory as ProductIcon,
  PlayArrow as GenerateIcon,
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  Download as DownloadIcon,
  Verified as VerifiedIcon,
  LocalHospital as HospitalIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Psychology as PsychologyIcon,
  Biotech as BiotechIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  Email as EmailIcon,
  Public as PublicIcon,
  CheckCircle as CheckCircleIcon,
  Share as ShareIcon,
  Settings as SettingsIcon,
  Palette as PaletteIcon
} from '@mui/icons-material';
import { designTokens } from './styles/designTokens';

// Create theme using design tokens
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: designTokens.colors.primary[500],
      light: designTokens.colors.primary[400],
      dark: designTokens.colors.primary[600],
    },
    secondary: {
      main: designTokens.colors.accent[500],
      light: designTokens.colors.accent[400],
      dark: designTokens.colors.accent[600],
    },
    success: {
      main: designTokens.colors.success[500],
    },
    background: {
      default: designTokens.colors.background.primary,
      paper: designTokens.colors.background.secondary,
    },
    text: {
      primary: designTokens.colors.text.primary,
      secondary: designTokens.colors.text.secondary,
    }
  },
  typography: {
    fontFamily: designTokens.typography.fontFamily.body,
    h1: { fontSize: designTokens.typography.fontSize['5xl'], fontWeight: designTokens.typography.fontWeight.bold },
    h2: { fontSize: designTokens.typography.fontSize['4xl'], fontWeight: designTokens.typography.fontWeight.semibold },
    h3: { fontSize: designTokens.typography.fontSize['3xl'], fontWeight: designTokens.typography.fontWeight.semibold },
    h4: { fontSize: designTokens.typography.fontSize['2xl'], fontWeight: designTokens.typography.fontWeight.medium },
  },
  shape: {
    borderRadius: parseInt(designTokens.borderRadius.md),
  },
});

// Styled components
const GlassCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
  backdropFilter: `blur(${designTokens.blur.lg})`,
  border: `1px solid ${designTokens.colors.border.light}`,
  transition: `all ${designTokens.animation.duration.base} ${designTokens.animation.easing.inOut}`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: designTokens.shadow.xl,
    border: `1px solid ${designTokens.colors.border.medium}`,
  }
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: 'white',
  fontWeight: designTokens.typography.fontWeight.semibold,
  padding: `${designTokens.spacing[3]} ${designTokens.spacing[6]}`,
  transition: `all ${designTokens.animation.duration.base} ${designTokens.animation.easing.inOut}`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: designTokens.shadow.glow,
  }
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: alpha(theme.palette.background.paper, 0.5),
    backdropFilter: `blur(${designTokens.blur.base})`,
    '&:hover': {
      background: alpha(theme.palette.background.paper, 0.7),
    },
    '&.Mui-focused': {
      background: alpha(theme.palette.background.paper, 0.9),
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.secondary.main,
        borderWidth: 2,
      }
    }
  }
}));

// Mock data for doctors
const mockDoctors = [
  { id: 1, name: "Dr. Sarah Chen", specialty: "Cardiology", hospital: "Mayo Clinic", verified: true, rating: 4.9, patients: 1250 },
  { id: 2, name: "Dr. Michael Roberts", specialty: "Neurology", hospital: "Johns Hopkins", verified: true, rating: 4.8, patients: 980 },
  { id: 3, name: "Dr. Emily Johnson", specialty: "Oncology", hospital: "MD Anderson", verified: false, rating: 4.7, patients: 850 },
  { id: 4, name: "Dr. James Wilson", specialty: "Orthopedics", hospital: "Cleveland Clinic", verified: true, rating: 4.9, patients: 1500 },
  { id: 5, name: "Dr. Lisa Martinez", specialty: "Pediatrics", hospital: "Boston Children's", verified: true, rating: 5.0, patients: 2000 },
];

// Mock products
const mockProducts = [
  { id: 1, name: "CardioMax Pro", category: "Cardiovascular", indication: "Hypertension" },
  { id: 2, name: "NeuroShield", category: "Neurology", indication: "Migraine Prevention" },
  { id: 3, name: "OncoTarget Plus", category: "Oncology", indication: "Targeted Therapy" },
  { id: 4, name: "FlexiJoint", category: "Orthopedics", indication: "Joint Pain Relief" },
  { id: 5, name: "PediaGrow", category: "Pediatrics", indication: "Growth Support" },
];

// Advanced DoctorSearchInput component
const DoctorSearchInput = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <StyledAutocomplete
      options={mockDoctors}
      getOptionLabel={(option) => option.name || ''}
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a doctor"
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <ListItem {...props} sx={{ py: 2 }}>
          <ListItemAvatar>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                option.verified ? (
                  <VerifiedIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                ) : null
              }
            >
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <PersonIcon />
              </Avatar>
            </Badge>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body1" fontWeight="medium">
                  {option.name}
                </Typography>
                <Chip
                  label={option.specialty}
                  size="small"
                  color="secondary"
                  sx={{ height: 20 }}
                />
              </Stack>
            }
            secondary={
              <Stack direction="row" alignItems="center" spacing={2} mt={0.5}>
                <Typography variant="caption" color="text.secondary">
                  <HospitalIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                  {option.hospital}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ⭐ {option.rating}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {option.patients} patients
                </Typography>
              </Stack>
            }
          />
        </ListItem>
      )}
    />
  );
};

// LocationPicker component
const LocationPicker = ({ value, onChange }) => {
  const locations = [
    "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX",
    "Phoenix, AZ", "Philadelphia, PA", "San Antonio, TX", "San Diego, CA"
  ];

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      options={locations}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select location"
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <LocationIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

// ProductSelector component
const ProductSelector = ({ value, onChange }) => {
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      options={mockProducts}
      getOptionLabel={(option) => option.name || ''}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select product"
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <ProductIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <ListItem {...props}>
          <ListItemText
            primary={option.name}
            secondary={
              <Stack direction="row" spacing={1} mt={0.5}>
                <Chip label={option.category} size="small" variant="outlined" />
                <Typography variant="caption" color="text.secondary">
                  {option.indication}
                </Typography>
              </Stack>
            }
          />
        </ListItem>
      )}
    />
  );
};

// Main App component
function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [workflowType, setWorkflowType] = useState('doctor');
  const [showPreview, setShowPreview] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);
  
  // Form state
  const [doctor, setDoctor] = useState(null);
  const [location, setLocation] = useState('');
  const [product, setProduct] = useState(null);
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');

  const steps = [
    { label: 'Select Workflow', icon: <DashboardIcon /> },
    { label: 'Doctor Information', icon: <SearchIcon /> },
    { label: 'Location & Contact', icon: <LocationIcon /> },
    { label: 'Product Selection', icon: <ProductIcon /> },
    { label: 'Generate Report', icon: <GenerateIcon /> }
  ];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      generateReport();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const generateReport = async () => {
    setGenerating(true);
    setShowPreview(true);
    
    // Simulate AI report generation
    setTimeout(() => {
      setGeneratedReport({
        doctor: doctor?.name || 'Unknown Doctor',
        specialty: doctor?.specialty || 'General',
        location: location || 'Unknown Location',
        product: product?.name || 'Unknown Product',
        insights: [
          `${doctor?.name} is a leading ${doctor?.specialty} specialist at ${doctor?.hospital} with over ${doctor?.patients} patients.`,
          `The doctor has shown significant interest in ${product?.category} treatments, particularly for ${product?.indication}.`,
          `Based on prescribing patterns in ${location}, there's a 78% likelihood of adoption for ${product?.name}.`,
          `Key opportunity: Schedule a meeting to discuss clinical trial results and patient outcomes.`
        ],
        score: 85,
        nextSteps: [
          'Schedule initial product presentation',
          'Prepare customized clinical data package',
          'Connect with medical science liaison',
          'Follow up within 2 weeks'
        ]
      });
      setGenerating(false);
    }, 3000);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Choose Your Workflow
            </Typography>
            <ToggleButtonGroup
              value={workflowType}
              exclusive
              onChange={(e, newType) => newType && setWorkflowType(newType)}
              sx={{ mt: 2, mb: 3 }}
            >
              <ToggleButton value="doctor" sx={{ px: 4 }}>
                <Stack alignItems="center" spacing={1}>
                  <PersonIcon />
                  <Typography variant="caption">Doctor Report</Typography>
                </Stack>
              </ToggleButton>
              <ToggleButton value="market" sx={{ px: 4 }}>
                <Stack alignItems="center" spacing={1}>
                  <TrendingUpIcon />
                  <Typography variant="caption">Market Intel</Typography>
                </Stack>
              </ToggleButton>
              <ToggleButton value="strategy" sx={{ px: 4 }}>
                <Stack alignItems="center" spacing={1}>
                  <PsychologyIcon />
                  <Typography variant="caption">Sales Strategy</Typography>
                </Stack>
              </ToggleButton>
            </ToggleButtonGroup>
            <Alert severity="info" sx={{ mt: 2 }}>
              {workflowType === 'doctor' && 'Generate comprehensive reports on healthcare professionals'}
              {workflowType === 'market' && 'Analyze market trends and competitive landscape'}
              {workflowType === 'strategy' && 'Create data-driven sales strategies and tactics'}
            </Alert>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Doctor Information
            </Typography>
            <DoctorSearchInput value={doctor} onChange={setDoctor} />
            {doctor && (
              <Fade in={true}>
                <GlassCard sx={{ mt: 3, p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.main' }}>
                      <PersonIcon />
                    </Avatar>
                    <Box flex={1}>
                      <Typography variant="h6">{doctor.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {doctor.specialty} at {doctor.hospital}
                      </Typography>
                      <Stack direction="row" spacing={2} mt={1}>
                        <Chip 
                          icon={<VerifiedIcon />} 
                          label={doctor.verified ? "Verified" : "Unverified"} 
                          size="small" 
                          color={doctor.verified ? "success" : "default"}
                        />
                        <Chip 
                          label={`${doctor.patients} patients`} 
                          size="small" 
                          variant="outlined"
                        />
                      </Stack>
                    </Box>
                  </Stack>
                </GlassCard>
              </Fade>
            )}
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Location & Contact Details
            </Typography>
            <Stack spacing={3}>
              <LocationPicker value={location} onChange={setLocation} />
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PublicIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Product Selection
            </Typography>
            <ProductSelector value={product} onChange={setProduct} />
            {product && (
              <Fade in={true}>
                <Alert severity="success" sx={{ mt: 3 }}>
                  <Typography variant="body2">
                    <strong>{product.name}</strong> - {product.indication}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Category: {product.category}
                  </Typography>
                </Alert>
              </Fade>
            )}
          </Box>
        );
      case 4:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review & Generate
            </Typography>
            <GlassCard sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Doctor</Typography>
                  <Typography>{doctor?.name || 'Not selected'}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Location</Typography>
                  <Typography>{location || 'Not selected'}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Product</Typography>
                  <Typography>{product?.name || 'Not selected'}</Typography>
                </Box>
              </Stack>
            </GlassCard>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', background: designTokens.colors.background.primary }}>
        <AppBar position="static" elevation={0} sx={{ 
          background: alpha(designTokens.colors.background.secondary, 0.8),
          backdropFilter: `blur(${designTokens.blur.lg})`,
          borderBottom: `1px solid ${designTokens.colors.border.light}`
        }}>
          <Toolbar>
            <AIIcon sx={{ mr: 2, color: 'secondary.main' }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              RepSpheres Intelligence
            </Typography>
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Main Content */}
            <Grid item xs={12} md={showPreview ? 6 : 8}>
              <Paper sx={{ 
                p: 4, 
                background: alpha(designTokens.colors.background.secondary, 0.5),
                backdropFilter: `blur(${designTokens.blur.base})`,
                border: `1px solid ${designTokens.colors.border.light}`
              }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        StepIconComponent={() => (
                          <Avatar
                            sx={{
                              bgcolor: index <= activeStep ? 'primary.main' : 'grey.700',
                              width: 32,
                              height: 32
                            }}
                          >
                            {step.icon}
                          </Avatar>
                        )}
                      >
                        {step.label}
                      </StepLabel>
                      <StepContent>
                        <Box sx={{ mb: 3 }}>
                          {getStepContent(index)}
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          <GradientButton
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mr: 1 }}
                            disabled={
                              (index === 1 && !doctor) ||
                              (index === 2 && !location) ||
                              (index === 3 && !product)
                            }
                          >
                            {index === steps.length - 1 ? 'Generate Report' : 'Continue'}
                          </GradientButton>
                          <Button
                            disabled={index === 0}
                            onClick={handleBack}
                          >
                            Back
                          </Button>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </Paper>
            </Grid>

            {/* Preview Panel */}
            {showPreview && (
              <Grid item xs={12} md={6}>
                <Zoom in={showPreview}>
                  <Paper sx={{ 
                    p: 4, 
                    background: alpha(designTokens.colors.background.secondary, 0.5),
                    backdropFilter: `blur(${designTokens.blur.base})`,
                    border: `1px solid ${designTokens.colors.border.light}`,
                    height: '100%'
                  }}>
                    <Typography variant="h5" gutterBottom>
                      AI Intelligence Report
                    </Typography>
                    
                    {generating ? (
                      <Box>
                        <LinearProgress sx={{ mb: 2 }} />
                        <Typography color="text.secondary">
                          Generating comprehensive report...
                        </Typography>
                      </Box>
                    ) : generatedReport ? (
                      <Fade in={true}>
                        <Box>
                          <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                            <Chip 
                              icon={<CheckCircleIcon />} 
                              label="Report Generated" 
                              color="success" 
                            />
                            <Chip 
                              label={`Score: ${generatedReport.score}/100`} 
                              color="primary" 
                            />
                          </Stack>

                          <Typography variant="h6" gutterBottom>
                            Key Insights
                          </Typography>
                          <List>
                            {generatedReport.insights.map((insight, idx) => (
                              <ListItem key={idx} sx={{ pl: 0 }}>
                                <ListItemText 
                                  primary={insight}
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>
                            ))}
                          </List>

                          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                            Recommended Next Steps
                          </Typography>
                          <Stack spacing={1}>
                            {generatedReport.nextSteps.map((step, idx) => (
                              <Chip 
                                key={idx}
                                label={step} 
                                variant="outlined" 
                                size="small"
                                sx={{ justifyContent: 'flex-start' }}
                              />
                            ))}
                          </Stack>

                          <Stack direction="row" spacing={2} mt={4}>
                            <Button 
                              variant="contained" 
                              startIcon={<DownloadIcon />}
                              fullWidth
                            >
                              Download Report
                            </Button>
                            <Button 
                              variant="outlined" 
                              startIcon={<ShareIcon />}
                              fullWidth
                            >
                              Share
                            </Button>
                          </Stack>
                        </Box>
                      </Fade>
                    ) : null}
                  </Paper>
                </Zoom>
              </Grid>
            )}

            {/* Stats Sidebar */}
            <Grid item xs={12} md={showPreview ? 12 : 4}>
              <Stack spacing={3}>
                <GlassCard>
                  <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="h4">1,234</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Reports Generated
                        </Typography>
                      </Box>
                      <AssessmentIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    </Stack>
                  </CardContent>
                </GlassCard>

                <GlassCard>
                  <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="h4">89%</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Accuracy Rate
                        </Typography>
                      </Box>
                      <TrendingUpIcon sx={{ fontSize: 40, color: 'success.main' }} />
                    </Stack>
                  </CardContent>
                </GlassCard>

                <GlassCard>
                  <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="h4">342</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Active Users
                        </Typography>
                      </Box>
                      <GroupIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
                    </Stack>
                  </CardContent>
                </GlassCard>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;