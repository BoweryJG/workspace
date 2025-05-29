import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme,
  alpha,
  Fade,
  Slide,
  Zoom,
  Paper,
  Chip,
  LinearProgress,
  Avatar,
  Tooltip,
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Container,
  Grow,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stack
} from '@mui/material';
import {
  Assessment,
  Favorite,
  Psychology,
  Gavel,
  Shield,
  EmojiEvents,
  GraphicEq,
  AutoAwesome,
  Person,
  Warning,
  Close,
  TrendingUp,
  Speed,
  Timer,
  PlayCircle,
  Insights,
  Analytics,
  CheckCircle,
  ArrowForward,
  Visibility
} from '@mui/icons-material';
import { AI_ANALYSIS_TYPES, generateAnalysisForType } from '../utils/aiAnalysisTypes';
import { generateMockConversation } from '../utils/mockDataGenerator';
import { GlassCard } from './StyledComponents';
import RecentActivityFeed from './RecentActivityFeed';

// Import all analysis components
import MEDDICAnalysis from './analysis/MEDDICAnalysis';
import EmotionalIntelligenceAnalysis from './analysis/EmotionalIntelligenceAnalysis';
import SPINAnalysis from './analysis/SPINAnalysis';
import ObjectionHandlingAnalysis from './analysis/ObjectionHandlingAnalysis';
import CompetitiveIntelligenceAnalysis from './analysis/CompetitiveIntelligenceAnalysis';
import TalkAnalyticsAnalysis from './analysis/TalkAnalyticsAnalysis';
import NextBestActionAnalysis from './analysis/NextBestActionAnalysis';
import PersonalityInsightsAnalysis from './analysis/PersonalityInsightsAnalysis';
import RiskAssessmentAnalysis from './analysis/RiskAssessmentAnalysis';
import NegotiationMasterAnalysis from './analysis/NegotiationMasterAnalysis';

// Analysis component mapping
const analysisComponents = {
  meddic: MEDDICAnalysis,
  emotional_intelligence: EmotionalIntelligenceAnalysis,
  spin: SPINAnalysis,
  objection_handling: ObjectionHandlingAnalysis,
  competitive_intelligence: CompetitiveIntelligenceAnalysis,
  talk_analytics: TalkAnalyticsAnalysis,
  next_best_action: NextBestActionAnalysis,
  personality_insights: PersonalityInsightsAnalysis,
  risk_assessment: RiskAssessmentAnalysis,
  negotiation_master: NegotiationMasterAnalysis
};

// Icon mapping
const iconMap = {
  Assessment,
  Favorite,
  Psychology,
  Gavel,
  Shield,
  EmojiEvents,
  GraphicEq,
  AutoAwesome,
  Person,
  Warning
};

// Floating particles background
const ParticleBackground = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        overflow: 'hidden',
        background: theme.palette.mode === 'dark'
          ? 'radial-gradient(ellipse at top, #1a1a2e 0%, #0a0a0a 100%)'
          : 'radial-gradient(ellipse at top, #f5f7fa 0%, #c3cfe2 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: theme.palette.mode === 'dark'
            ? 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '20%',
          left: '10%',
          animation: 'float 15s ease-in-out infinite',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '300px',
          height: '300px',
          background: theme.palette.mode === 'dark'
            ? 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          bottom: '20%',
          right: '10%',
          animation: 'float 20s ease-in-out infinite reverse',
        },
        '@keyframes float': {
          '0%, 100%': {
            transform: 'translateY(0) translateX(0)',
          },
          '33%': {
            transform: 'translateY(-30px) translateX(30px)',
          },
          '66%': {
            transform: 'translateY(30px) translateX(-30px)',
          },
        },
      }}
    />
  );
};

// AI Analysis Card
const AIAnalysisCard = ({ analysis, onClick, index }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[analysis.icon] || Assessment;
  
  return (
    <Grow in timeout={500 + index * 100}>
      <Card
        onClick={() => onClick(analysis)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          height: '100%',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          background: theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.8)
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${isHovered ? analysis.color : alpha(analysis.color, 0.3)}`,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'none',
          boxShadow: isHovered
            ? `0 20px 40px ${alpha(analysis.color, 0.3)}`
            : '0 4px 20px rgba(0, 0, 0, 0.1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: analysis.gradient,
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.4s ease',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: analysis.gradient,
            opacity: isHovered ? 0.1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }
        }}
      >
        <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <Box
              sx={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  background: isHovered ? analysis.gradient : 'transparent',
                  border: `2px solid ${analysis.color}`,
                  transition: 'all 0.4s ease',
                  boxShadow: isHovered ? `0 0 30px ${alpha(analysis.color, 0.5)}` : 'none',
                }}
              >
                <Icon sx={{ fontSize: 32, color: isHovered ? '#FFFFFF' : analysis.color }} />
              </Avatar>
              {isHovered && (
                <Box
                  sx={{
                    position: 'absolute',
                    inset: -8,
                    borderRadius: '50%',
                    border: `2px solid ${analysis.color}`,
                    animation: 'pulse 1.5s ease-in-out infinite',
                    '@keyframes pulse': {
                      '0%': {
                        transform: 'scale(1)',
                        opacity: 0.5,
                      },
                      '100%': {
                        transform: 'scale(1.2)',
                        opacity: 0,
                      },
                    },
                  }}
                />
              )}
            </Box>
            {analysis.persona && (
              <Chip
                label={analysis.persona}
                size="small"
                sx={{
                  ml: 'auto',
                  background: analysis.gradient,
                  color: '#FFFFFF',
                  fontWeight: 700,
                  boxShadow: `0 4px 12px ${alpha(analysis.color, 0.4)}`,
                }}
              />
            )}
          </Box>
          
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 800,
              mb: 1,
              color: theme.palette.text.primary,
              letterSpacing: '-0.02em'
            }}
          >
            {analysis.name}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mb: 3, minHeight: 48, lineHeight: 1.6 }}
          >
            {analysis.description}
          </Typography>
          
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {analysis.insights.map((insight, idx) => (
              <Chip
                key={idx}
                label={insight}
                size="small"
                sx={{
                  mb: 1,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  bgcolor: alpha(analysis.color, 0.1),
                  color: analysis.color,
                  border: `1px solid ${alpha(analysis.color, 0.3)}`,
                  '&:hover': {
                    bgcolor: alpha(analysis.color, 0.2),
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease',
                }}
              />
            ))}
          </Stack>
          
          <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button
              size="small"
              sx={{
                color: analysis.color,
                fontWeight: 700,
                '&:hover': {
                  bgcolor: alpha(analysis.color, 0.1),
                },
              }}
              endIcon={<ArrowForward />}
            >
              Analyze Now
            </Button>
            {isHovered && (
              <Fade in>
                <Chip
                  size="small"
                  icon={<AutoAwesome />}
                  label="AI Powered"
                  sx={{
                    bgcolor: alpha(analysis.color, 0.1),
                    color: analysis.color,
                    fontWeight: 600,
                  }}
                />
              </Fade>
            )}
          </Box>
        </CardContent>
      </Card>
    </Grow>
  );
};

// Hero Stats
const HeroStat = ({ title, value, subtitle, icon, gradient, delay }) => {
  const theme = useTheme();
  
  return (
    <Fade in timeout={600 + delay}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          height: '100%',
          background: theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.6)
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: theme.palette.divider,
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
            '& .stat-icon': {
              transform: 'scale(1.1) rotate(5deg)',
            }
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 700 }}>
              {title}
            </Typography>
            <Avatar
              className="stat-icon"
              sx={{
                width: 40,
                height: 40,
                background: gradient,
                transition: 'all 0.3s ease',
              }}
            >
              {icon}
            </Avatar>
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 0.5 }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
            background: gradient,
            opacity: 0.05,
            transform: 'skewX(-20deg) translateX(20px)',
          }}
        />
      </Paper>
    </Fade>
  );
};

// Recent Activity Item
const RecentActivityItem = ({ activity, index }) => {
  const theme = useTheme();
  
  return (
    <Slide direction="left" in timeout={800 + index * 100}>
      <ListItem
        sx={{
          bgcolor: alpha(theme.palette.background.paper, 0.6),
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          mb: 1,
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            transform: 'translateX(8px)',
          }
        }}
      >
        <ListItemIcon>
          <Avatar sx={{ bgcolor: activity.color, width: 36, height: 36 }}>
            {activity.score}
          </Avatar>
        </ListItemIcon>
        <ListItemText
          primary={activity.title}
          secondary={activity.time}
          primaryTypographyProps={{ fontWeight: 600 }}
        />
        <Chip
          label={`${activity.insights} insights`}
          size="small"
          color="primary"
          variant="outlined"
        />
      </ListItem>
    </Slide>
  );
};

// Main Component
const ImmersiveSalesHub = () => {
  const theme = useTheme();
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [recentActivity, setRecentActivity] = useState([]);
  
  useEffect(() => {
    // Generate recent activity
    const activities = [
      { title: 'TechCorp Demo Call', score: 92, time: '10 minutes ago', insights: 8, color: '#4CAF50' },
      { title: 'StartupX Discovery', score: 85, time: '1 hour ago', insights: 6, color: '#2196F3' },
      { title: 'Enterprise Deal Review', score: 78, time: '3 hours ago', insights: 5, color: '#FF9800' },
    ];
    setRecentActivity(activities);
  }, []);
  
  const handleAnalysisClick = (analysis) => {
    setSelectedAnalysis(analysis);
    setDialogOpen(true);
  };
  
  const renderAnalysisComponent = () => {
    if (!selectedAnalysis) return null;
    
    const AnalysisComponent = analysisComponents[selectedAnalysis.id];
    if (!AnalysisComponent) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Analysis Coming Soon
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedAnalysis.name} analysis will be available soon with detailed insights.
          </Typography>
        </Box>
      );
    }
    
    // Generate mock conversation data for analysis
    const mockData = generateMockConversation();
    return <AnalysisComponent conversationData={mockData} />;
  };
  
  const heroStats = [
    { 
      title: 'Win Rate', 
      value: '87%', 
      subtitle: '+12% this month',
      icon: <TrendingUp sx={{ color: '#FFFFFF' }} />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      delay: 0
    },
    { 
      title: 'Conversations', 
      value: '156', 
      subtitle: 'This week',
      icon: <Analytics sx={{ color: '#FFFFFF' }} />,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      delay: 100
    },
    { 
      title: 'Time Saved', 
      value: '24h', 
      subtitle: 'With AI insights',
      icon: <Timer sx={{ color: '#FFFFFF' }} />,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      delay: 200
    },
    { 
      title: 'Deal Velocity', 
      value: '32d', 
      subtitle: '-8 days avg',
      icon: <Speed sx={{ color: '#FFFFFF' }} />,
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      delay: 300
    },
  ];
  
  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', pb: 4 }}>
      <ParticleBackground />
      
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <Box sx={{ pt: 4, pb: 6, textAlign: 'center' }}>
          <Fade in timeout={400}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 900,
                fontSize: { xs: '2.5rem', md: '4rem' },
                mb: 2,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%)'
                  : 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}
            >
              AI Conversation Intelligence
            </Typography>
          </Fade>
          
          <Fade in timeout={600}>
            <Typography 
              variant="h5" 
              sx={{ 
                maxWidth: 800, 
                mx: 'auto',
                color: 'text.secondary',
                mb: 4,
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              10 AI-powered analysis perspectives to transform your sales conversations into winning strategies
            </Typography>
          </Fade>
          
          <Fade in timeout={800}>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayCircle />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 40px rgba(102, 126, 234, 0.5)',
                }
              }}
            >
              Upload New Conversation
            </Button>
          </Fade>
        </Box>
        
        {/* Hero Stats */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {heroStats.map((stat, index) => (
            <Grid item xs={6} md={3} key={stat.title}>
              <HeroStat {...stat} />
            </Grid>
          ))}
        </Grid>
        
        {/* Main Content Grid */}
        <Grid container spacing={4}>
          {/* AI Analysis Cards */}
          <Grid item xs={12} lg={9}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                Choose Your AI Analysis
              </Typography>
              <Chip
                icon={<AutoAwesome />}
                label="10 AI Models Available"
                color="primary"
                sx={{ fontWeight: 700 }}
              />
            </Box>
            
            <Grid container spacing={3}>
              {Object.values(AI_ANALYSIS_TYPES).map((analysis, index) => (
                <Grid item xs={12} sm={6} md={4} key={analysis.id}>
                  <AIAnalysisCard 
                    analysis={analysis} 
                    onClick={handleAnalysisClick}
                    index={index}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          
          {/* Recent Activity Sidebar */}
          <Grid item xs={12} lg={3}>
            <Box sx={{ 
              position: 'sticky', 
              top: 20,
              background: theme.palette.mode === 'dark'
                ? alpha(theme.palette.background.paper, 0.6)
                : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              border: '1px solid',
              borderColor: theme.palette.divider,
              overflow: 'hidden',
              height: 'calc(100vh - 120px)'
            }}>
              <RecentActivityFeed />
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* Analysis Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="xl"
        fullWidth
        fullScreen
        PaperProps={{
          sx: {
            background: theme.palette.mode === 'dark'
              ? 'rgba(15, 15, 15, 0.98)'
              : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: 0,
          }
        }}
      >
        {selectedAnalysis && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      background: selectedAnalysis.gradient,
                    }}
                  >
                    {React.createElement(iconMap[selectedAnalysis.icon] || Assessment, { sx: { color: '#FFFFFF', fontSize: 28 } })}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      {selectedAnalysis.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      AI-Powered Analysis Results
                    </Typography>
                  </Box>
                </Box>
                <IconButton onClick={() => setDialogOpen(false)}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
              {renderAnalysisComponent()}
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ImmersiveSalesHub;