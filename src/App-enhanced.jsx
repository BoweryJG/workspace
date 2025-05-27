import React, { useState, useEffect } from 'react';
import { 
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
  Zoom,
  Menu,
  Switch,
  FormControlLabel
} from '@mui/material';
import { ThemeProvider as MuiThemeProvider, alpha, styled } from '@mui/material/styles';
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
  Palette as PaletteIcon,
  Person as PersonIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  VolumeUp as VolumeIcon,
  VolumeOff as VolumeOffIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Keyboard as KeyboardIcon
} from '@mui/icons-material';
import { designTokens } from './styles/designTokens';

// Import new components and hooks
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import CommandPalette from './components/CommandPalette';
import Confetti from './components/Confetti';
import { useKeyboardShortcuts, useGlobalShortcuts } from './hooks/useKeyboardShortcuts';
import { useFavorites } from './hooks/useFavorites';
import { useRecentSearches } from './hooks/useRecentSearches';
import { useSoundEffects } from './hooks/useSoundEffects';

// Styled components
const GlassCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
  backdropFilter: `blur(${designTokens.blur.lg})`,
  border: `1px solid ${theme.palette.mode === 'dark' ? designTokens.colors.border.light : theme.palette.divider}`,
  transition: `all ${designTokens.animation.duration.base} ${designTokens.animation.easing.inOut}`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: designTokens.shadow.xl,
    border: `1px solid ${theme.palette.mode === 'dark' ? designTokens.colors.border.medium : theme.palette.primary.main}`,
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
const DoctorSearchInput = ({ value, onChange, favorites, onToggleFavorite }) => {
  const [inputValue, setInputValue] = useState('');
  const { play } = useSoundEffects();

  return (
    <StyledAutocomplete
      options={mockDoctors}
      getOptionLabel={(option) => option.name || ''}
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue);
        if (newValue) play('click');
      }}
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
      renderOption={(props, option) => {
        const isFavorited = favorites.some(fav => fav.id === option.id);
        return (
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
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(option);
                  play('click');
                }}
              >
                {isFavorited ? (
                  <StarIcon sx={{ color: 'warning.main' }} />
                ) : (
                  <StarBorderIcon />
                )}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      }}
    />
  );
};

// Main App component wrapped with theme
function AppContent() {
  const { mode, toggleTheme, theme } = useTheme();
  const { favorites, toggleFavorite, isFavorited } = useFavorites();
  const { recentSearches, addSearch } = useRecentSearches();
  const { enabled: soundEnabled, toggleSound, play } = useSoundEffects();
  
  const [activeStep, setActiveStep] = useState(0);
  const [workflowType, setWorkflowType] = useState('doctor');
  const [showPreview, setShowPreview] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [settingsAnchor, setSettingsAnchor] = useState(null);
  
  // Form state
  const [doctor, setDoctor] = useState(null);
  const [location, setLocation] = useState('');
  const [product, setProduct] = useState(null);
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');

  // Global keyboard shortcuts
  useGlobalShortcuts(
    () => setCommandPaletteOpen(true),
    () => {
      setActiveStep(0);
      setDoctor(null);
      setLocation('');
      setProduct(null);
      play('whoosh');
    }
  );

  const steps = [
    { label: 'Select Workflow', icon: <DashboardIcon /> },
    { label: 'Doctor Information', icon: <SearchIcon /> },
    { label: 'Location & Contact', icon: <LocationIcon /> },
    { label: 'Product Selection', icon: <ProductIcon /> },
    { label: 'Generate Report', icon: <GenerateIcon /> }
  ];

  const handleNext = () => {
    play('click');
    if (activeStep === steps.length - 1) {
      generateReport();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    play('click');
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const generateReport = async () => {
    setGenerating(true);
    setShowPreview(true);
    play('whoosh');
    
    // Add to recent searches
    if (doctor) {
      addSearch(doctor.name, 'doctor', doctor);
    }
    
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
      setShowConfetti(true);
      play('success');
      setTimeout(() => setShowConfetti(false), 3000);
    }, 3000);
  };

  const handleCommandPaletteSelect = (item) => {
    switch (item.action) {
      case 'new-report':
        setActiveStep(0);
        setDoctor(null);
        setLocation('');
        setProduct(null);
        break;
      case 'select-doctor':
        setDoctor(item.data);
        setActiveStep(1);
        break;
      case 'search':
        // Handle search action
        addSearch(item.data.query);
        break;
    }
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
              onChange={(e, newType) => {
                if (newType) {
                  setWorkflowType(newType);
                  play('click');
                }
              }}
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
            <DoctorSearchInput 
              value={doctor} 
              onChange={setDoctor}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
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
                    <IconButton
                      onClick={() => {
                        toggleFavorite(doctor);
                        play('click');
                      }}
                    >
                      {isFavorited(doctor.id) ? (
                        <StarIcon sx={{ color: 'warning.main' }} />
                      ) : (
                        <StarBorderIcon />
                      )}
                    </IconButton>
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
              <Autocomplete
                value={location}
                onChange={(event, newValue) => setLocation(newValue)}
                options={["New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX"]}
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
            <Autocomplete
              value={product}
              onChange={(event, newValue) => {
                setProduct(newValue);
                if (newValue) play('click');
              }}
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
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', background: theme.palette.background.default }}>
        <AppBar position="static" elevation={0} sx={{ 
          background: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: `blur(${designTokens.blur.lg})`,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}>
          <Toolbar>
            <AIIcon sx={{ mr: 2, color: 'secondary.main' }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              RepSpheres Intelligence
            </Typography>
            
            <Tooltip title="Keyboard shortcuts">
              <IconButton color="inherit" onClick={() => setCommandPaletteOpen(true)}>
                <KeyboardIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Toggle theme">
              <IconButton color="inherit" onClick={toggleTheme}>
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
            
            <IconButton 
              color="inherit"
              onClick={(e) => setSettingsAnchor(e.currentTarget)}
            >
              <SettingsIcon />
            </IconButton>
            
            <Menu
              anchorEl={settingsAnchor}
              open={Boolean(settingsAnchor)}
              onClose={() => setSettingsAnchor(null)}
            >
              <MenuItem>
                <FormControlLabel
                  control={
                    <Switch
                      checked={soundEnabled}
                      onChange={toggleSound}
                      icon={<VolumeOffIcon />}
                      checkedIcon={<VolumeIcon />}
                    />
                  }
                  label="Sound Effects"
                />
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Main Content */}
            <Grid item xs={12} md={showPreview ? 6 : 8}>
              <Paper sx={{ 
                p: 4, 
                background: alpha(theme.palette.background.paper, 0.5),
                backdropFilter: `blur(${designTokens.blur.base})`,
                border: `1px solid ${theme.palette.divider}`
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
                    background: alpha(theme.palette.background.paper, 0.5),
                    backdropFilter: `blur(${designTokens.blur.base})`,
                    border: `1px solid ${theme.palette.divider}`,
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
                              onClick={() => play('click')}
                            >
                              Download Report
                            </Button>
                            <Button 
                              variant="outlined" 
                              startIcon={<ShareIcon />}
                              fullWidth
                              onClick={() => play('click')}
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
                
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <GlassCard>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Recent Searches
                      </Typography>
                      <List dense>
                        {recentSearches.slice(0, 3).map((search) => (
                          <ListItem 
                            key={search.id}
                            button
                            onClick={() => {
                              if (search.type === 'doctor' && search.data) {
                                setDoctor(search.data);
                                setActiveStep(1);
                              }
                              play('click');
                            }}
                          >
                            <ListItemText 
                              primary={search.query}
                              secondary={search.formattedTimestamp}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </GlassCard>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Container>
        
        {/* Command Palette */}
        <CommandPalette
          open={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onSelect={handleCommandPaletteSelect}
          recentSearches={recentSearches}
          favorites={favorites}
        />
        
        {/* Confetti */}
        <Confetti active={showConfetti} />
        
        {/* Keyboard Shortcuts Help */}
        <Box sx={{ 
          position: 'fixed', 
          bottom: 20, 
          right: 20,
          display: 'flex',
          gap: 1
        }}>
          <Chip
            size="small"
            label="⌘K Search"
            sx={{ opacity: 0.7 }}
          />
          <Chip
            size="small"
            label="⌘N New Report"
            sx={{ opacity: 0.7 }}
          />
        </Box>
      </Box>
    </MuiThemeProvider>
  );
}

// Main App component
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;