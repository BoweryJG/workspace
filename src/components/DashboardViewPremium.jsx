import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  Paper,
  Fade,
  Slide,
  useTheme,
  Grow,
  Zoom
} from '@mui/material';
import {
  Psychology,
  TrackChanges,
  ArrowForward,
  Analytics,
  Groups,
  Group,
  Gavel,
  Bolt,
  ThumbDown,
  TrendingUp,
  Science,
  Loop,
  Hearing,
  FileUpload,
  AutoAwesome,
  Insights,
  Speed,
  EmojiEvents
} from '@mui/icons-material';
import { 
  ScoreBadge, 
  IconWrapper, 
  Badge, 
  ProgressBar, 
  GlassCard,
  GradientButton,
  GradientAvatar
} from './StyledComponents';
import { 
  generateInitialConversations, 
  generatePerformanceMetrics,
  generateMockConversation 
} from '../utils/mockDataGenerator';

const DashboardView = ({ onUploadClick }) => {
  const theme = useTheme();
  const [expandedSection, setExpandedSection] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load mock data on component mount
  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setRecentAnalyses(generateInitialConversations(5));
      setPerformanceMetrics(generatePerformanceMetrics());
      setIsLoading(false);
    }, 800);
    
    // Set up interval to occasionally add new conversations
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        const newConversation = generateMockConversation();
        setRecentAnalyses(prev => [newConversation, ...prev].slice(0, 10));
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Function to toggle section expansion
  const toggleSection = (sectionName) => {
    if (expandedSection === sectionName) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionName);
    }
  };
  
  // Transform performance metrics for display
  const metricsList = performanceMetrics ? [
    { 
      label: 'Strategy Score', 
      value: performanceMetrics.strategyScore.value, 
      change: performanceMetrics.strategyScore.change, 
      variant: 'success' 
    },
    { 
      label: 'Calls Analyzed', 
      value: performanceMetrics.callsAnalyzed.value, 
      change: performanceMetrics.callsAnalyzed.change, 
      variant: 'info' 
    },
    { 
      label: 'Avg. Call Score', 
      value: performanceMetrics.avgCallScore.value, 
      change: performanceMetrics.avgCallScore.change, 
      variant: 'primary' 
    },
    { 
      label: 'Insights Generated', 
      value: performanceMetrics.insightsGenerated.value, 
      change: performanceMetrics.insightsGenerated.change, 
      variant: 'secondary' 
    },
  ] : [];

  return (
    <Box className="stagger-children">
      {/* Hero Section */}
      <Fade in timeout={300}>
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 900,
              mb: 2,
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, #A78BFA 0%, #67E8F9 100%)'
                : 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em'
            }}
          >
            Welcome to Your Analytics Hub
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
          >
            Transform your conversations into actionable insights with AI-powered analysis
          </Typography>
        </Box>
      </Fade>
      
      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metricsList.map((metric, index) => (
          <Grid item xs={6} md={3} key={metric.label}>
            <Zoom in timeout={400 + index * 100}>
              <GlassCard
                sx={{
                  textAlign: 'center',
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                  }
                }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {metric.label}
                </Typography>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 800,
                    fontSize: '2rem',
                    mb: 1,
                    background: theme.palette.mode === 'dark' 
                      ? 'linear-gradient(135deg, #A78BFA 0%, #67E8F9 100%)'
                      : 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {metric.value}
                </Typography>
                <Badge variant={metric.variant} animated>
                  {metric.change}
                </Badge>
              </GlassCard>
            </Zoom>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Analyses */}
        <Grid item xs={12} lg={8}>
          <Slide direction="up" in timeout={600}>
            <GlassCard>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AutoAwesome 
                      sx={{ 
                        color: theme.palette.primary.main,
                        filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))'
                      }} 
                    />
                    <Typography variant="h5" fontWeight={700}>
                      Recent Analyses
                    </Typography>
                  </Box>
                }
                action={
                  <GradientButton variant="primary">
                    View All
                  </GradientButton>
                }
              />
              <CardContent>
                <Box sx={{ '& > :not(:last-child)': { mb: 2 } }}>
                  {recentAnalyses.slice(0, 3).map((analysis, index) => (
                    <Grow in timeout={800 + index * 100} key={analysis.id}>
                      <Paper 
                        elevation={0} 
                        onMouseEnter={() => setHoveredCard(analysis.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        sx={{ 
                          p: 3, 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 3,
                          borderRadius: '16px',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          cursor: 'pointer',
                          position: 'relative',
                          overflow: 'hidden',
                          background: hoveredCard === analysis.id 
                            ? theme.palette.action.hover 
                            : theme.palette.background.paper,
                          border: `1px solid ${hoveredCard === analysis.id 
                            ? theme.palette.primary.main 
                            : theme.palette.divider}`,
                          '&:hover': {
                            transform: 'translateX(8px)',
                            boxShadow: `0 8px 32px ${theme.palette.primary.main}20`,
                            '&::before': {
                              transform: 'translateX(100%)',
                            }
                          },
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}10, transparent)`,
                            transition: 'transform 0.6s ease',
                          }
                        }}
                      >
                        <ScoreBadge score={analysis.score} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
                            {analysis.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {analysis.dateString}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Badge variant="info">
                            {analysis.insights.length} insights
                          </Badge>
                          <ArrowForward 
                            sx={{ 
                              color: theme.palette.primary.main,
                              transition: 'transform 0.3s ease',
                              transform: hoveredCard === analysis.id ? 'translateX(4px)' : 'none'
                            }} 
                          />
                        </Box>
                      </Paper>
                    </Grow>
                  ))}
                </Box>
              </CardContent>
            </GlassCard>
          </Slide>
        </Grid>
        
        {/* Quick Upload & Performance */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Quick Upload */}
            <Slide direction="left" in timeout={700}>
              <GlassCard>
                <CardHeader 
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Speed sx={{ color: theme.palette.secondary.main }} />
                      <Typography variant="h5" fontWeight={700}>Quick Upload</Typography>
                    </Box>
                  } 
                />
                <CardContent>
                  <Box 
                    onClick={onUploadClick}
                    sx={{ 
                      border: `2px dashed ${theme.palette.divider}`,
                      borderRadius: '20px', 
                      p: 4, 
                      textAlign: 'center', 
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      background: theme.palette.mode === 'dark'
                        ? 'rgba(167, 139, 250, 0.05)'
                        : 'rgba(99, 102, 241, 0.05)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        background: theme.palette.mode === 'dark'
                          ? 'rgba(167, 139, 250, 0.1)'
                          : 'rgba(99, 102, 241, 0.1)',
                        transform: 'scale(1.02)',
                        '& .upload-icon': {
                          transform: 'translateY(-8px) scale(1.1)',
                        }
                      }
                    }}
                  >
                    <IconWrapper color="primary" size="large" className="upload-icon">
                      <FileUpload fontSize="large" />
                    </IconWrapper>
                    <Typography variant="h5" fontWeight={700} sx={{ mt: 2, mb: 1 }}>
                      Upload Conversation
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Drop your audio file here or click to browse
                    </Typography>
                    <GradientButton variant="primary">
                      Select File
                    </GradientButton>
                  </Box>
                </CardContent>
              </GlassCard>
            </Slide>

            {/* Achievement Card */}
            <Slide direction="left" in timeout={800}>
              <GlassCard>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <IconWrapper color="warning" size="medium">
                      <EmojiEvents />
                    </IconWrapper>
                    <Box>
                      <Typography variant="h6" fontWeight={700}>
                        Weekly Champion!
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Top performer this week
                      </Typography>
                    </Box>
                  </Box>
                  <ProgressBar value={87} color="warning" animated />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    87% average strategy score
                  </Typography>
                </CardContent>
              </GlassCard>
            </Slide>
          </Box>
        </Grid>
        
        {/* Strategic Insights */}
        <Grid item xs={12}>
          <Fade in timeout={900}>
            <GlassCard>
              <CardHeader 
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Insights 
                      sx={{ 
                        color: theme.palette.secondary.main,
                        filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.5))'
                      }} 
                    />
                    <Typography variant="h5" fontWeight={700}>
                      Strategic Insights
                    </Typography>
                  </Box>
                }
              />
              <CardContent>
                <Grid container spacing={3}>
                  {[
                    { icon: Psychology, color: 'secondary', title: 'Psychology Patterns', metric: 'Analytical', value: 42 },
                    { icon: Groups, color: 'primary', title: 'Team Dynamics', metric: 'Collaborative', value: 68 },
                    { icon: TrendingUp, color: 'success', title: 'Performance Trends', metric: 'Growth Rate', value: 85 },
                  ].map((insight, index) => (
                    <Grid item xs={12} md={4} key={insight.title}>
                      <Zoom in timeout={1000 + index * 100}>
                        <Paper 
                          sx={{ 
                            p: 3,
                            borderRadius: '20px',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            overflow: 'hidden',
                            background: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.divider}`,
                            '&:hover': { 
                              transform: 'translateY(-8px) scale(1.02)',
                              boxShadow: `0 20px 40px ${theme.palette[insight.color].main}20`,
                              borderColor: theme.palette[insight.color].main,
                            }
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <IconWrapper color={insight.color} size="medium">
                              <insight.icon />
                            </IconWrapper>
                            <Typography variant="h6" fontWeight={600}>
                              {insight.title}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {insight.metric}
                          </Typography>
                          <ProgressBar value={insight.value} color={insight.color} animated />
                          <Typography 
                            variant="h4" 
                            sx={{ 
                              mt: 2, 
                              fontWeight: 700,
                              color: theme.palette[insight.color].main
                            }}
                          >
                            {insight.value}%
                          </Typography>
                        </Paper>
                      </Zoom>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </GlassCard>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardView;