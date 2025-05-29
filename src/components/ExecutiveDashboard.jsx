import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  useTheme,
  alpha,
  Fade,
  Slide,
  IconButton,
  Tooltip,
  LinearProgress,
  Rating
} from '@mui/material';
import {
  Gavel,
  TrendingUp,
  Psychology,
  Warning,
  CheckCircle,
  ArrowUpward,
  ArrowDownward,
  AttachMoney,
  Timer,
  Groups,
  AutoAwesome,
  EmojiObjects,
  Speed,
  Assessment,
  BarChart,
  PieChart,
  ShowChart
} from '@mui/icons-material';
import { 
  generateInitialConversations, 
  generatePerformanceMetrics,
  generateMockConversation 
} from '../utils/mockDataGenerator';
import { generateCompleteAnalysis } from '../utils/advancedMockData';

// Professional metric card component
const MetricCard = ({ title, value, change, icon, color = 'primary', prefix = '', suffix = '' }) => {
  const theme = useTheme();
  const isPositive = change && change.includes('+');
  
  return (
    <Paper
      sx={{
        p: 3,
        height: '100%',
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.1)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`
          : `linear-gradient(135deg, ${alpha(theme.palette[color].light, 0.1)} 0%, ${alpha('#FFFFFF', 0.9)} 100%)`,
        border: `1px solid ${alpha(theme.palette[color].main, 0.2)}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 24px ${alpha(theme.palette[color].main, 0.15)}`,
          borderColor: theme.palette[color].main,
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {prefix}{value}{suffix}
          </Typography>
          {change && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {isPositive ? (
                <ArrowUpward sx={{ fontSize: 16, color: 'success.main' }} />
              ) : (
                <ArrowDownward sx={{ fontSize: 16, color: 'error.main' }} />
              )}
              <Typography 
                variant="body2" 
                sx={{ 
                  color: isPositive ? 'success.main' : 'error.main',
                  fontWeight: 600 
                }}
              >
                {change}
              </Typography>
            </Box>
          )}
        </Box>
        <Avatar
          sx={{
            bgcolor: alpha(theme.palette[color].main, 0.1),
            color: theme.palette[color].main,
            width: 48,
            height: 48
          }}
        >
          {icon}
        </Avatar>
      </Box>
    </Paper>
  );
};

// Harvey Specter Advisor Card
const HarveySpecterCard = ({ advice }) => {
  const theme = useTheme();
  
  return (
    <Card
      sx={{
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, rgba(30, 30, 30, 0.9) 0%, rgba(20, 20, 20, 0.95) 100%)'
          : 'linear-gradient(135deg, rgba(25, 25, 25, 0.95) 0%, rgba(15, 15, 15, 0.98) 100%)',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
        }
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            src="/harvey-specter.jpg"
            sx={{
              width: 80,
              height: 80,
              border: '3px solid #FFD700',
              mr: 3
            }}
          >
            <Gavel sx={{ fontSize: 40 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#FFD700' }}>
              Harvey Specter
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Senior Partner | Strategic Advisor
            </Typography>
          </Box>
        </Box>

        <Typography 
          variant="h5" 
          sx={{ 
            fontStyle: 'italic', 
            mb: 4,
            pl: 2,
            borderLeft: '4px solid #FFD700',
            color: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          "{advice.opening_move}"
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, color: '#FFD700' }}>
          Strategic Insights:
        </Typography>
        
        <List>
          {advice.key_insights.slice(0, 2).map((insight, index) => (
            <ListItem key={index} sx={{ pl: 0 }}>
              <ListItemIcon>
                <CheckCircle sx={{ color: '#FFD700' }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {insight.observation}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: 1 }}>
                    {insight.action}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(255, 215, 0, 0.1)', borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#FFD700', mb: 1 }}>
            Closing Strategy:
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            {advice.closing_strategy}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

// Deal Intelligence Card
const DealIntelligenceCard = ({ analysis }) => {
  const theme = useTheme();
  
  return (
    <Card
      sx={{
        height: '100%',
        background: theme.palette.mode === 'dark'
          ? alpha(theme.palette.background.paper, 0.8)
          : '#FFFFFF',
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          Deal Intelligence
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Win Probability
                </Typography>
                <Typography variant="h6" color="primary">
                  {analysis.overall_assessment.deal_probability}%
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={analysis.overall_assessment.deal_probability} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)'
                  }
                }}
              />
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              Psychological Profile
            </Typography>
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 2, 
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderColor: alpha(theme.palette.primary.main, 0.2)
              }}
            >
              <Typography variant="h6" color="primary" gutterBottom>
                {analysis.psychological_profiles.primary_type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {analysis.psychological_profiles.influence_strategy}
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              Critical Success Factors
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {analysis.overall_assessment.critical_factors.map((factor, index) => (
                <Paper
                  key={index}
                  sx={{
                    px: 2,
                    py: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`
                  }}
                >
                  <Warning sx={{ fontSize: 16, color: 'warning.main' }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {factor}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// Behavioral Insights Card
const BehavioralInsightsCard = ({ behavioral }) => {
  const theme = useTheme();
  
  return (
    <Card
      sx={{
        height: '100%',
        background: theme.palette.mode === 'dark'
          ? alpha(theme.palette.background.paper, 0.8)
          : '#FFFFFF',
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Psychology sx={{ mr: 1, color: 'secondary.main' }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Behavioral Analysis
          </Typography>
        </Box>
        
        {behavioral.findings.slice(0, 3).map((finding, index) => (
          <Paper
            key={index}
            sx={{
              p: 2,
              mb: 2,
              bgcolor: alpha(theme.palette.secondary.main, 0.05),
              border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              {finding.indicator || finding.trigger}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {finding.significance || finding.description}
            </Typography>
            {finding.frequency && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" color="secondary.main">
                  Frequency: {finding.frequency}
                </Typography>
              </Box>
            )}
          </Paper>
        ))}
      </CardContent>
    </Card>
  );
};

const ExecutiveDashboard = ({ onUploadClick }) => {
  const theme = useTheme();
  const [conversations, setConversations] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load mock data
    setTimeout(() => {
      const mockConversations = generateInitialConversations(5);
      const mockMetrics = generatePerformanceMetrics();
      const analysis = generateCompleteAnalysis();
      
      setConversations(mockConversations);
      setMetrics(mockMetrics);
      setCurrentAnalysis(analysis);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Executive Header */}
      <Fade in timeout={300}>
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800,
              mb: 1,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                : 'linear-gradient(135deg, #1A237E 0%, #3949AB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Executive Intelligence Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Real-time sales performance analytics powered by behavioral AI
          </Typography>
        </Box>
      </Fade>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Slide direction="up" in timeout={400}>
            <Box>
              <MetricCard
                title="Revenue Pipeline"
                value="2.4M"
                prefix="$"
                change="+18%"
                icon={<AttachMoney />}
                color="success"
              />
            </Box>
          </Slide>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Slide direction="up" in timeout={500}>
            <Box>
              <MetricCard
                title="Win Rate"
                value={metrics?.strategyScore.value || 84.2}
                suffix="%"
                change={metrics?.strategyScore.change || "+12%"}
                icon={<TrendingUp />}
                color="primary"
              />
            </Box>
          </Slide>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Slide direction="up" in timeout={600}>
            <Box>
              <MetricCard
                title="Avg Deal Size"
                value="125K"
                prefix="$"
                change="+23%"
                icon={<Assessment />}
                color="secondary"
              />
            </Box>
          </Slide>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Slide direction="up" in timeout={700}>
            <Box>
              <MetricCard
                title="Sales Velocity"
                value="32"
                suffix=" days"
                change="-15%"
                icon={<Speed />}
                color="warning"
              />
            </Box>
          </Slide>
        </Grid>
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Harvey Specter Strategic Advisor */}
        <Grid item xs={12} lg={6}>
          <Fade in timeout={800}>
            <Box>
              <HarveySpecterCard advice={currentAnalysis.strategic_advice} />
            </Box>
          </Fade>
        </Grid>

        {/* Deal Intelligence */}
        <Grid item xs={12} lg={6}>
          <Fade in timeout={900}>
            <Box>
              <DealIntelligenceCard analysis={currentAnalysis} />
            </Box>
          </Fade>
        </Grid>

        {/* Behavioral Insights */}
        <Grid item xs={12} lg={6}>
          <Fade in timeout={1000}>
            <Box>
              <BehavioralInsightsCard behavioral={currentAnalysis.behavioral_indicators} />
            </Box>
          </Fade>
        </Grid>

        {/* Recent Conversations */}
        <Grid item xs={12} lg={6}>
          <Fade in timeout={1100}>
            <Card
              sx={{
                height: '100%',
                background: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.background.paper, 0.8)
                  : '#FFFFFF',
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Recent Analysis
                  </Typography>
                  <Tooltip title="Upload New Recording">
                    <IconButton 
                      onClick={onUploadClick}
                      sx={{ 
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        }
                      }}
                    >
                      <AutoAwesome />
                    </IconButton>
                  </Tooltip>
                </Box>
                
                <List>
                  {conversations.slice(0, 4).map((conv, index) => (
                    <React.Fragment key={conv.id}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <Avatar sx={{ bgcolor: conv.score >= 90 ? 'success.main' : 'primary.main' }}>
                            {conv.score}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={conv.title}
                          secondary={conv.dateString}
                          primaryTypographyProps={{ fontWeight: 500 }}
                        />
                      </ListItem>
                      {index < 3 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExecutiveDashboard;