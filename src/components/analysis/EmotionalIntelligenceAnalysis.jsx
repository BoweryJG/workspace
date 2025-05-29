import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  LinearProgress,
  Chip,
  useTheme,
  alpha,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert
} from '@mui/material';
import {
  Favorite,
  TrendingUp,
  TrendingDown,
  SentimentVeryDissatisfied,
  SentimentDissatisfied,
  SentimentNeutral,
  SentimentSatisfied,
  SentimentVerySatisfied,
  Psychology,
  Warning,
  CheckCircle
} from '@mui/icons-material';

const EmotionalIntelligenceAnalysis = ({ data }) => {
  const theme = useTheme();
  
  // Dental-specific emotional intelligence data
  const emotionalData = data || {
    overall_emotional_score: 78,
    sentiment_journey: [
      { time: "0-3min", phase: "Opening", sentiment: "Cautious", score: 35, notes: "Initial dental anxiety visible" },
      { time: "3-8min", phase: "Problem Discovery", sentiment: "Concerned", score: 45, notes: "Discussing smile dissatisfaction" },
      { time: "8-15min", phase: "Solution Presentation", sentiment: "Interested", score: 65, notes: "Engaged with veneer examples" },
      { time: "15-22min", phase: "Visualization", sentiment: "Excited", score: 85, notes: "Saw 3D smile preview" },
      { time: "22-25min", phase: "Investment Discussion", sentiment: "Hesitant", score: 55, notes: "Price sensitivity emerged" },
      { time: "25-30min", phase: "Closing", sentiment: "Optimistic", score: 75, notes: "Agreed to financing consultation" }
    ],
    emotional_triggers: [
      {
        trigger: "3D Smile Preview",
        timestamp: "16:30",
        impact: "Very High",
        response: "Visible excitement, leaned forward, asked to see multiple angles",
        sentiment_change: "+35 points",
        notes: "This was the turning point - patient could visualize the outcome"
      },
      {
        trigger: "Before/After Photos",
        timestamp: "12:45", 
        impact: "High",
        response: "Asked multiple questions, requested to see similar cases",
        sentiment_change: "+20 points",
        notes: "Particularly interested in cases similar to her age/profession"
      },
      {
        trigger: "Investment Amount Revealed",
        timestamp: "23:15",
        impact: "Negative High",
        response: "Slight pause, body language shifted, asked about alternatives",
        sentiment_change: "-25 points", 
        notes: "Expected reaction - need to emphasize value proposition"
      },
      {
        trigger: "Financing Options Explained",
        timestamp: "26:40",
        impact: "High",
        response: "Relief visible, questions became more specific about timeline",
        sentiment_change: "+20 points",
        notes: "Monthly payment breakdown made treatment feel achievable"
      }
    ],
    rapport_indicators: {
      mirroring: {
        score: 85,
        examples: [
          "Adopted patient's terminology ('Hollywood smile')",
          "Matched speaking pace when discussing concerns",
          "Used similar hand gestures during explanation"
        ]
      },
      trust_building: {
        score: 78,
        indicators: [
          "Patient shared personal concerns about aging",
          "Asked about doctor's own dental work",
          "Discussed upcoming daughter's wedding",
          "Requested direct cell phone contact"
        ]
      },
      engagement_level: {
        score: 82,
        metrics: [
          "Asked 18 clarifying questions",
          "Took notes during explanation",
          "Requested additional educational materials",
          "Scheduled follow-up consultation"
        ]
      }
    },
    emotional_concerns: [
      {
        concern: "Dental Anxiety",
        severity: "Medium",
        indicators: ["Fidgeting during procedure explanation", "Multiple questions about pain"],
        addressed: true,
        resolution: "Discussed sedation options and gentle approach"
      },
      {
        concern: "Social Judgment",
        severity: "High", 
        indicators: ["Worried about appearance during treatment", "Asked about discretion"],
        addressed: true,
        resolution: "Explained natural-looking temporary options"
      },
      {
        concern: "Financial Stress",
        severity: "Medium",
        indicators: ["Hesitation at price point", "Questions about necessity"],
        addressed: true,
        resolution: "Provided financing options and value justification"
      }
    ],
    communication_style: {
      preferred: "Visual and experiential",
      pace: "Moderate with time for processing",
      tone: "Warm and reassuring",
      approach: "Consultative with emotional validation"
    }
  };
  
  const getSentimentIcon = (sentiment) => {
    const sentimentMap = {
      "Cautious": SentimentDissatisfied,
      "Concerned": SentimentDissatisfied, 
      "Interested": SentimentNeutral,
      "Excited": SentimentSatisfied,
      "Hesitant": SentimentNeutral,
      "Optimistic": SentimentVerySatisfied
    };
    return sentimentMap[sentiment] || SentimentNeutral;
  };
  
  const getSentimentColor = (score) => {
    if (score >= 80) return theme.palette.success.main;
    if (score >= 60) return theme.palette.warning.main;
    if (score >= 40) return theme.palette.info.main;
    return theme.palette.error.main;
  };
  
  return (
    <Box>
      {/* Overall Emotional Intelligence Score */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(233, 30, 99, 0.1) 0%, rgba(233, 30, 99, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(233, 30, 99, 0.05) 0%, rgba(233, 30, 99, 0.02) 100%)',
          border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
          borderRadius: 3
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: theme.palette.secondary.main,
                  mx: 'auto',
                  mb: 2
                }}
              >
                <Favorite sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h3" sx={{ fontWeight: 800, color: 'secondary.main' }}>
                {emotionalData.overall_emotional_score}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Emotional Intelligence Score
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              Emotional Analysis Summary
            </Typography>
            <Typography variant="body1" paragraph>
              Patient showed strong emotional progression from initial anxiety to excitement when visualizing results. 
              Key breakthrough moment occurred during 3D preview demonstration.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="High Visual Responsiveness" color="success" size="small" />
              <Chip label="Price Sensitivity" color="warning" size="small" />
              <Chip label="Trust Building Success" color="success" size="small" />
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Sentiment Journey */}
      <Card elevation={0} sx={{ mb: 4, border: `1px solid ${theme.palette.divider}` }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUp color="secondary" />
            Emotional Journey Throughout Consultation
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            {emotionalData.sentiment_journey.map((phase, index) => {
              const SentimentIcon = getSentimentIcon(phase.sentiment);
              return (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Chip 
                      label={phase.time} 
                      size="small" 
                      sx={{ mr: 2, minWidth: 80 }} 
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 2 }}>
                      {phase.phase}
                    </Typography>
                    <SentimentIcon sx={{ color: getSentimentColor(phase.score), mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {phase.sentiment}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={phase.score}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        flex: 1,
                        mr: 2,
                        bgcolor: alpha(getSentimentColor(phase.score), 0.1),
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getSentimentColor(phase.score),
                        }
                      }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 40 }}>
                      {phase.score}%
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                    {phase.notes}
                  </Typography>
                  
                  {index < emotionalData.sentiment_journey.length - 1 && (
                    <Divider sx={{ mt: 2 }} />
                  )}
                </Box>
              );
            })}
          </Box>
        </CardContent>
      </Card>
      
      {/* Emotional Triggers */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
            Critical Emotional Triggers
          </Typography>
        </Grid>
        
        {emotionalData.emotional_triggers.map((trigger, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                border: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: trigger.impact.includes('High') ? 'success.main' : 'warning.main',
                      mr: 2,
                      width: 40,
                      height: 40
                    }}
                  >
                    <Psychology />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {trigger.trigger}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {trigger.timestamp}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Chip 
                    label={`${trigger.impact} Impact`}
                    size="small"
                    color={trigger.impact.includes('High') ? 'success' : 'warning'}
                    sx={{ mr: 1 }}
                  />
                  <Chip 
                    label={trigger.sentiment_change}
                    size="small"
                    color={trigger.sentiment_change.includes('+') ? 'success' : 'error'}
                  />
                </Box>
                
                <Typography variant="body2" paragraph>
                  <strong>Response:</strong> {trigger.response}
                </Typography>
                
                <Alert severity="info" variant="outlined" sx={{ mt: 2 }}>
                  {trigger.notes}
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Rapport & Trust Building */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ height: '100%', border: `1px solid ${theme.palette.divider}` }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                Rapport Building
              </Typography>
              <Box sx={{ mb: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={emotionalData.rapport_indicators.mirroring.score}
                  sx={{ height: 8, borderRadius: 4, mb: 1 }}
                />
                <Typography variant="body2">
                  Mirroring Score: {emotionalData.rapport_indicators.mirroring.score}%
                </Typography>
              </Box>
              <List dense>
                {emotionalData.rapport_indicators.mirroring.examples.map((example, idx) => (
                  <ListItem key={idx} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={example}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ height: '100%', border: `1px solid ${theme.palette.divider}` }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                Trust Indicators
              </Typography>
              <Box sx={{ mb: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={emotionalData.rapport_indicators.trust_building.score}
                  sx={{ height: 8, borderRadius: 4, mb: 1 }}
                />
                <Typography variant="body2">
                  Trust Score: {emotionalData.rapport_indicators.trust_building.score}%
                </Typography>
              </Box>
              <List dense>
                {emotionalData.rapport_indicators.trust_building.indicators.map((indicator, idx) => (
                  <ListItem key={idx} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={indicator}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ height: '100%', border: `1px solid ${theme.palette.divider}` }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                Engagement Level
              </Typography>
              <Box sx={{ mb: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={emotionalData.rapport_indicators.engagement_level.score}
                  sx={{ height: 8, borderRadius: 4, mb: 1 }}
                />
                <Typography variant="body2">
                  Engagement: {emotionalData.rapport_indicators.engagement_level.score}%
                </Typography>
              </Box>
              <List dense>
                {emotionalData.rapport_indicators.engagement_level.metrics.map((metric, idx) => (
                  <ListItem key={idx} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={metric}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Emotional Concerns & Resolutions */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
          Emotional Concerns Addressed
        </Typography>
        
        <Grid container spacing={2}>
          {emotionalData.emotional_concerns.map((concern, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Alert
                severity={concern.addressed ? "success" : "warning"}
                variant="outlined"
                sx={{ height: '100%' }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {concern.concern}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
                  <strong>Severity:</strong> {concern.severity}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Indicators:</strong> {concern.indicators.join(', ')}
                </Typography>
                {concern.addressed && (
                  <Typography variant="body2">
                    <strong>Resolution:</strong> {concern.resolution}
                  </Typography>
                )}
              </Alert>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default EmotionalIntelligenceAnalysis;