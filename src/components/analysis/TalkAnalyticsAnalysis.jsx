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
  Alert,
  Divider
} from '@mui/material';
import {
  RecordVoiceOver,
  Hearing,
  Timer,
  Speed,
  VolumeUp,
  Pause,
  TrendingUp,
  TrendingDown,
  Psychology,
  Assessment
} from '@mui/icons-material';

const TalkAnalyticsAnalysis = ({ conversationData }) => {
  const talkData = {
    overall_metrics: {
      total_duration: "42:15",
      talk_time_ratio: {
        sales_rep: 65,
        patient: 35
      },
      ideal_ratio: "40:60",
      score: 72
    },
    speaking_patterns: {
      sales_rep: {
        total_talk_time: "27:30",
        average_speaking_segments: 45,
        longest_monologue: "3:45",
        speaking_pace: 165, // words per minute
        interruptions: 8,
        pause_frequency: 23,
        energy_level: 78
      },
      patient: {
        total_talk_time: "14:45",
        average_speaking_segments: 32,
        longest_response: "2:20",
        speaking_pace: 142,
        interruptions_received: 8,
        hesitation_frequency: 15,
        engagement_level: 68
      }
    },
    conversation_flow: {
      opening: {
        duration: "5:20",
        rep_percentage: 70,
        patient_percentage: 30,
        quality: "Good - appropriate intro phase"
      },
      discovery: {
        duration: "18:45",
        rep_percentage: 55,
        patient_percentage: 45,
        quality: "Excellent - good patient exploration"
      },
      presentation: {
        duration: "12:30",
        rep_percentage: 75,
        patient_percentage: 25,
        quality: "Needs improvement - too much talking"
      },
      closing: {
        duration: "5:40",
        rep_percentage: 60,
        patient_percentage: 40,
        quality: "Good - collaborative decision making"
      }
    },
    dental_specific_insights: {
      patient_anxiety_indicators: [
        {
          timestamp: "8:45",
          indicator: "Increased speaking pace + hesitation",
          context: "Discussing treatment pain",
          impact: "Anxiety spike detected"
        },
        {
          timestamp: "23:15",
          indicator: "Long pauses before price discussion",
          context: "Treatment cost reveal",
          impact: "Financial concern processing"
        }
      ],
      engagement_peaks: [
        {
          timestamp: "15:30",
          trigger: "3D smile preview shown",
          patient_response: "Increased talking, excited tone",
          outcome: "High engagement moment"
        },
        {
          timestamp: "31:20",
          trigger: "Before/after photos discussion",
          patient_response: "Detailed questions, longer responses",
          outcome: "Strong interest confirmation"
        }
      ],
      objection_patterns: [
        {
          timestamp: "25:40",
          objection_type: "Cost concern",
          rep_response_time: "2.3 seconds",
          effectiveness: "Good - acknowledged quickly"
        },
        {
          timestamp: "35:10",
          objection_type: "Timeline concern",
          rep_response_time: "0.8 seconds",
          effectiveness: "Excellent - immediate address"
        }
      ]
    },
    communication_quality: {
      clarity_metrics: {
        rep_clarity_score: 85,
        use_of_jargon: 12, // instances
        patient_understanding_indicators: 78,
        clarification_requests: 4
      },
      active_listening: {
        acknowledgment_frequency: 34,
        clarifying_questions: 18,
        summarization_instances: 6,
        listening_score: 81
      },
      emotional_intelligence: {
        empathy_expressions: 9,
        tone_matching: 72,
        emotional_validation: 11,
        eq_score: 76
      }
    },
    optimization_opportunities: [
      {
        area: "Talk Time Balance",
        current: "65% rep / 35% patient",
        target: "40% rep / 60% patient",
        recommendation: "Ask more open-ended questions, allow longer patient responses"
      },
      {
        area: "Monologue Length",
        current: "3:45 maximum",
        target: "Under 2:00",
        recommendation: "Break presentations into smaller chunks with check-ins"
      },
      {
        area: "Interruption Management",
        current: "8 interruptions",
        target: "Under 5",
        recommendation: "Practice pause techniques, let patient finish thoughts"
      }
    ],
    conversation_momentum: [
      { time: "0-5min", momentum: 75, phase: "Opening", notes: "Good rapport building" },
      { time: "5-15min", momentum: 88, phase: "Discovery", notes: "Excellent patient engagement" },
      { time: "15-25min", momentum: 65, phase: "Presentation", notes: "Too much rep talking" },
      { time: "25-35min", momentum: 72, phase: "Objection Handling", notes: "Handled concerns well" },
      { time: "35-42min", momentum: 82, phase: "Closing", notes: "Strong collaborative finish" }
    ]
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#f44336';
  };

  const getMomentumColor = (momentum) => {
    if (momentum >= 80) return '#4CAF50';
    if (momentum >= 70) return '#2196F3';
    if (momentum >= 60) return '#FF9800';
    return '#f44336';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ 
        background: 'linear-gradient(45deg, #FF9800, #F57C00)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold',
        mb: 3
      }}>
        Talk Analytics Analysis
      </Typography>

      <Grid container spacing={3}>
        {/* Overall Metrics */}
        <Grid item xs={12}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(245, 124, 0, 0.05))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 152, 0, 0.2)'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <RecordVoiceOver sx={{ fontSize: 40, color: '#FF9800', mr: 2 }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Talk Analytics Score: {talkData.overall_metrics.score}/100
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total conversation: {talkData.overall_metrics.total_duration} • Rep: {talkData.overall_metrics.talk_time_ratio.sales_rep}% / Patient: {talkData.overall_metrics.talk_time_ratio.patient}%
                  </Typography>
                </Box>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={talkData.overall_metrics.score} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: 'rgba(255, 152, 0, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #FF9800, #F57C00)'
                  }
                }}
              />
              <Alert severity="warning" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Optimization Needed:</strong> Current ratio {talkData.overall_metrics.talk_time_ratio.sales_rep}:{talkData.overall_metrics.talk_time_ratio.patient}, ideal is {talkData.overall_metrics.ideal_ratio}
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        {/* Speaking Patterns Comparison */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Speaking Patterns Analysis
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <RecordVoiceOver sx={{ color: '#2196F3', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      Sales Rep Patterns
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Talk Time:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {talkData.speaking_patterns.sales_rep.total_talk_time}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Speaking Pace:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {talkData.speaking_patterns.sales_rep.speaking_pace} WPM
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Longest Monologue:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#f44336' }}>
                        {talkData.speaking_patterns.sales_rep.longest_monologue}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Interruptions Made:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#FF9800' }}>
                        {talkData.speaking_patterns.sales_rep.interruptions}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Energy Level
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={talkData.speaking_patterns.sales_rep.energy_level} 
                    sx={{ 
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: 'rgba(33, 150, 243, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#2196F3'
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Hearing sx={{ color: '#4CAF50', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      Patient Patterns
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Talk Time:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {talkData.speaking_patterns.patient.total_talk_time}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Speaking Pace:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {talkData.speaking_patterns.patient.speaking_pace} WPM
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Longest Response:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {talkData.speaking_patterns.patient.longest_response}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Hesitations:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {talkData.speaking_patterns.patient.hesitation_frequency}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Engagement Level
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={talkData.speaking_patterns.patient.engagement_level} 
                    sx={{ 
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: 'rgba(76, 175, 80, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#4CAF50'
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Conversation Flow */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Conversation Flow by Phase
              </Typography>
              
              {Object.entries(talkData.conversation_flow).map(([phase, data], index) => (
                <Box key={phase} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                      {phase} ({data.duration})
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip 
                        label={`Rep: ${data.rep_percentage}%`}
                        size="small"
                        sx={{ backgroundColor: '#2196F3', color: 'white' }}
                      />
                      <Chip 
                        label={`Patient: ${data.patient_percentage}%`}
                        size="small"
                        sx={{ backgroundColor: '#4CAF50', color: 'white' }}
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', mb: 1 }}>
                    <Box sx={{ 
                      width: `${data.rep_percentage}%`, 
                      height: 8, 
                      backgroundColor: '#2196F3',
                      borderRadius: data.patient_percentage === 0 ? '4px' : '4px 0 0 4px'
                    }} />
                    <Box sx={{ 
                      width: `${data.patient_percentage}%`, 
                      height: 8, 
                      backgroundColor: '#4CAF50',
                      borderRadius: data.rep_percentage === 0 ? '4px' : '0 4px 4px 0'
                    }} />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary">
                    {data.quality}
                  </Typography>
                  
                  {index < Object.keys(talkData.conversation_flow).length - 1 && <Divider sx={{ mt: 2 }} />}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Communication Quality */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Communication Quality
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Clarity & Understanding
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Clarity Score:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {talkData.communication_quality.clarity_metrics.rep_clarity_score}/100
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Jargon Usage:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#FF9800' }}>
                    {talkData.communication_quality.clarity_metrics.use_of_jargon} instances
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Active Listening
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Listening Score:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {talkData.communication_quality.active_listening.listening_score}/100
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Acknowledgments:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {talkData.communication_quality.active_listening.acknowledgment_frequency}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Emotional Intelligence
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">EQ Score:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {talkData.communication_quality.emotional_intelligence.eq_score}/100
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={talkData.communication_quality.emotional_intelligence.eq_score} 
                  sx={{ 
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'rgba(156, 39, 176, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#9C27B0'
                    }
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Conversation Momentum */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Conversation Momentum Timeline
              </Typography>
              
              <Box sx={{ position: 'relative', height: 120 }}>
                {talkData.conversation_momentum.map((segment, index) => (
                  <Box key={index} sx={{ 
                    position: 'absolute',
                    left: `${(index / talkData.conversation_momentum.length) * 100}%`,
                    width: `${100 / talkData.conversation_momentum.length}%`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: 0.5
                  }}>
                    <Box sx={{
                      width: '80%',
                      height: `${segment.momentum}%`,
                      backgroundColor: getMomentumColor(segment.momentum),
                      borderRadius: '4px 4px 0 0',
                      mb: 1
                    }} />
                    <Typography variant="caption" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                      {segment.time}
                    </Typography>
                    <Typography variant="caption" sx={{ textAlign: 'center', fontSize: '0.7rem' }}>
                      {segment.phase}
                    </Typography>
                    <Typography variant="caption" sx={{ textAlign: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>
                      {segment.momentum}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Dental-Specific Insights */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Key Moments
              </Typography>
              
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#f44336' }}>
                Anxiety Indicators
              </Typography>
              {talkData.dental_specific_insights.patient_anxiety_indicators.map((indicator, index) => (
                <Paper key={index} sx={{ p: 1.5, mb: 1, backgroundColor: 'rgba(244, 67, 54, 0.1)' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
                    {indicator.timestamp}: {indicator.indicator}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                    {indicator.context}
                  </Typography>
                </Paper>
              ))}

              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#4CAF50', mt: 2 }}>
                Engagement Peaks
              </Typography>
              {talkData.dental_specific_insights.engagement_peaks.map((peak, index) => (
                <Paper key={index} sx={{ p: 1.5, mb: 1, backgroundColor: 'rgba(76, 175, 80, 0.1)' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
                    {peak.timestamp}: {peak.trigger}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                    {peak.patient_response}
                  </Typography>
                </Paper>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Optimization Opportunities */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Optimization Opportunities
              </Typography>
              
              <Grid container spacing={2}>
                {talkData.optimization_opportunities.map((opportunity, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Paper sx={{ p: 2, height: '100%', backgroundColor: 'rgba(255, 152, 0, 0.1)' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {opportunity.area}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        <strong>Current:</strong> {opportunity.current}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        <strong>Target:</strong> {opportunity.target}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#FF9800', fontWeight: 'bold' }}>
                        <strong>Action:</strong> {opportunity.recommendation}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TalkAnalyticsAnalysis;