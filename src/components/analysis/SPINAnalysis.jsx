import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  QuestionMark,
  TrendingUp,
  Psychology,
  CheckCircle,
  Warning,
  Star
} from '@mui/icons-material';

const SPINAnalysis = ({ conversationData }) => {
  const spinData = {
    overall_score: 78,
    methodology_breakdown: {
      situation: {
        score: 85,
        questions_asked: 12,
        effectiveness: "Excellent",
        examples: [
          "What's your current approach to smile makeovers?",
          "How many cosmetic cases do you typically see monthly?",
          "What's your patient demographic for aesthetic treatments?"
        ]
      },
      problem: {
        score: 72,
        questions_asked: 8,
        effectiveness: "Good",
        examples: [
          "What challenges do you face with case acceptance?",
          "How do patients typically react to treatment costs?",
          "What's preventing you from growing your cosmetic practice?"
        ]
      },
      implication: {
        score: 65,
        questions_asked: 6,
        effectiveness: "Needs Improvement",
        examples: [
          "What happens when patients delay treatment?",
          "How does low case acceptance affect your practice growth?",
          "What's the cost of losing aesthetic cases to competitors?"
        ]
      },
      need_payoff: {
        score: 88,
        questions_asked: 10,
        effectiveness: "Excellent",
        examples: [
          "How would higher case acceptance impact your revenue?",
          "What would it mean to have patients excited about treatment?",
          "How valuable would it be to streamline your consultation process?"
        ]
      }
    },
    dental_specific_insights: {
      treatment_focus: "Smile makeovers and aesthetic dentistry",
      patient_psychology: "Addressing aesthetic concerns and financial anxiety",
      practice_growth: "Scaling cosmetic revenue through better consultations",
      competitive_advantage: "Differentiating through patient experience"
    },
    questioning_effectiveness: [
      {
        category: "Discovery",
        score: 82,
        strength: "Thorough current state assessment",
        opportunity: "Dig deeper into patient objections"
      },
      {
        category: "Problem Development",
        score: 71,
        strength: "Good at identifying practice challenges",
        opportunity: "Connect problems to bigger business impact"
      },
      {
        category: "Solution Selling",
        score: 86,
        strength: "Excellent at painting future state vision",
        opportunity: "More quantification of benefits"
      }
    ],
    improvement_recommendations: [
      "Increase implication questions to build urgency",
      "Quantify the cost of current problems more specifically",
      "Connect aesthetic outcomes to patient confidence and life impact",
      "Explore competitive threats in more detail"
    ]
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#f44336';
  };

  const getEffectivenessColor = (effectiveness) => {
    switch (effectiveness) {
      case 'Excellent': return '#4CAF50';
      case 'Good': return '#2196F3';
      case 'Needs Improvement': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ 
        background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold',
        mb: 3
      }}>
        SPIN Selling Analysis
      </Typography>

      <Grid container spacing={3}>
        {/* Overall Score */}
        <Grid item xs={12}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(33, 203, 243, 0.05))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(33, 150, 243, 0.2)'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Psychology sx={{ fontSize: 40, color: '#2196F3', mr: 2 }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Overall SPIN Score: {spinData.overall_score}/100
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Systematic questioning effectiveness in dental sales consultation
                  </Typography>
                </Box>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={spinData.overall_score} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: 'rgba(33, 150, 243, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #2196F3, #21CBF3)'
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* SPIN Methodology Breakdown */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            SPIN Methodology Breakdown
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(spinData.methodology_breakdown).map(([key, data]) => (
              <Grid item xs={12} md={6} key={key}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <QuestionMark sx={{ color: getScoreColor(data.score), mr: 1 }} />
                      <Typography variant="h6" sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                        {key.replace('_', ' ')} Questions
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Score: {data.score}/100 • Questions Asked: {data.questions_asked}
                      </Typography>
                      <Chip 
                        label={data.effectiveness}
                        size="small"
                        sx={{ 
                          backgroundColor: getEffectivenessColor(data.effectiveness),
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>

                    <LinearProgress 
                      variant="determinate" 
                      value={data.score} 
                      sx={{ 
                        mb: 2,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: getScoreColor(data.score)
                        }
                      }}
                    />

                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Example Questions:
                    </Typography>
                    <List dense>
                      {data.examples.map((example, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <Box sx={{ 
                              width: 6, 
                              height: 6, 
                              borderRadius: '50%', 
                              backgroundColor: getScoreColor(data.score) 
                            }} />
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
            ))}
          </Grid>
        </Grid>

        {/* Questioning Effectiveness */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Questioning Effectiveness
              </Typography>
              {spinData.questioning_effectiveness.map((item, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {item.category}
                    </Typography>
                    <Chip 
                      label={`${item.score}%`}
                      size="small"
                      sx={{ 
                        backgroundColor: getScoreColor(item.score),
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CheckCircle sx={{ color: '#4CAF50', fontSize: 16, mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      <strong>Strength:</strong> {item.strength}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp sx={{ color: '#FF9800', fontSize: 16, mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      <strong>Opportunity:</strong> {item.opportunity}
                    </Typography>
                  </Box>
                  {index < spinData.questioning_effectiveness.length - 1 && <Divider sx={{ mt: 2 }} />}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Dental-Specific Insights */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Dental-Specific Insights
              </Typography>
              {Object.entries(spinData.dental_specific_insights).map(([key, value], index) => (
                <Box key={key} sx={{ mb: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                    {key.replace('_', ' ')}:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Improvement Recommendations */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Improvement Recommendations
              </Typography>
              <List>
                {spinData.improvement_recommendations.map((recommendation, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Star sx={{ color: '#FFD700' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={recommendation}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SPINAnalysis;