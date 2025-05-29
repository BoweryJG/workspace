import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  alpha,
  Card,
  CardContent,
  LinearProgress
} from '@mui/material';
import {
  CheckCircle,
  Warning,
  TrendingUp,
  Psychology,
  Gavel,
  EmojiObjects,
  Timeline,
  Assignment,
  Person,
  ArrowForward,
  AttachMoney,
  Speed,
  BarChart
} from '@mui/icons-material';

const ExecutiveSummarySection = ({ analysis, conversation }) => {
  const theme = useTheme();
  
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 4, 
        mb: 4,
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.98) 100%)'
          : 'linear-gradient(135deg, #FAFBFF 0%, #F5F7FF 100%)',
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Executive Summary
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Overall Score
            </Typography>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800,
                color: conversation.score >= 90 ? 'success.main' : 
                       conversation.score >= 70 ? 'primary.main' : 'warning.main'
              }}
            >
              {conversation.score}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              out of 100
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Win Probability
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, color: 'secondary.main' }}>
              {analysis.overallAssessment.deal_probability}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              likelihood
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Deal Value
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, color: 'success.main' }}>
              $125K
            </Typography>
            <Typography variant="body2" color="text.secondary">
              estimated
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Time to Close
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, color: 'warning.main' }}>
              32
            </Typography>
            <Typography variant="body2" color="text.secondary">
              days
            </Typography>
          </Box>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 3 }} />
      
      <Typography variant="h6" gutterBottom>
        Strategic Assessment
      </Typography>
      <Typography variant="body1" paragraph>
        {analysis.overallAssessment.momentum}
      </Typography>
      
      <Grid container spacing={2}>
        {analysis.overallAssessment.critical_factors.map((factor, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                borderColor: 'warning.main',
                bgcolor: alpha(theme.palette.warning.main, 0.05)
              }}
            >
              <Warning sx={{ color: 'warning.main' }} />
              <Typography variant="body2">{factor}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

const HarveySpecterSection = ({ advice }) => {
  const theme = useTheme();
  
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 4, 
        mb: 4,
        background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
        color: '#FFFFFF',
        border: '1px solid rgba(255, 215, 0, 0.3)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar 
          sx={{ 
            width: 60, 
            height: 60, 
            bgcolor: '#FFD700',
            color: '#1A1A1A',
            mr: 2,
            fontWeight: 800
          }}
        >
          HS
        </Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#FFD700' }}>
            Strategic Advisory
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Harvey Specter, Senior Partner
          </Typography>
        </Box>
      </Box>
      
      <Typography 
        variant="h6" 
        sx={{ 
          fontStyle: 'italic',
          mb: 3,
          pl: 2,
          borderLeft: '3px solid #FFD700'
        }}
      >
        "{advice.opening_move}"
      </Typography>
      
      <Typography variant="subtitle1" sx={{ color: '#FFD700', mb: 2 }}>
        Key Strategic Insights:
      </Typography>
      
      {advice.key_insights.map((insight, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            {index + 1}. {insight.observation}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, color: 'rgba(255, 255, 255, 0.8)' }}>
            <strong>Reality:</strong> {insight.reality}
          </Typography>
          <Typography variant="body2" sx={{ color: '#FFD700' }}>
            <strong>Action:</strong> {insight.action}
          </Typography>
        </Box>
      ))}
      
      <Box sx={{ mt: 4, p: 3, bgcolor: 'rgba(255, 215, 0, 0.1)', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ color: '#FFD700', mb: 2 }}>
          Power Moves
        </Typography>
        <Grid container spacing={2}>
          {advice.power_moves.map((move, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <CheckCircle sx={{ color: '#FFD700', fontSize: 20, mt: 0.5 }} />
                <Typography variant="body2">{move}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
      
      <Typography variant="h6" sx={{ color: '#FFD700', mb: 1 }}>
        Closing Strategy
      </Typography>
      <Typography variant="body1" paragraph>
        {advice.closing_strategy}
      </Typography>
      
      <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.7)' }}>
        Remember: {advice.mindset}
      </Typography>
    </Paper>
  );
};

const BehavioralAnalysisSection = ({ behavioral, psychological }) => {
  const theme = useTheme();
  
  return (
    <Paper elevation={0} sx={{ p: 4, mb: 4, border: `1px solid ${theme.palette.divider}` }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Psychology sx={{ color: 'secondary.main' }} />
        Behavioral & Psychological Analysis
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Prospect Profile: {psychological.primary_type}
          </Typography>
          
          <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Communication Style</TableCell>
                  <TableCell>{psychological.communication_style.preferred}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Decision Pace</TableCell>
                  <TableCell>{psychological.communication_style.pace}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Avoid</TableCell>
                  <TableCell>{psychological.communication_style.avoid}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Key Decision Factors
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {psychological.decision_factors.map((factor, index) => (
                <Chip key={index} label={factor} size="small" color="primary" variant="outlined" />
              ))}
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Behavioral Indicators
          </Typography>
          
          <List>
            {behavioral.findings.slice(0, 3).map((finding, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemIcon>
                  <EmojiObjects sx={{ color: 'warning.main' }} />
                </ListItemIcon>
                <ListItemText
                  primary={finding.indicator || finding.trigger}
                  secondary={finding.significance || finding.description}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Recommended Influence Strategy
        </Typography>
        <Typography variant="body1">
          {psychological.influence_strategy}
        </Typography>
      </Box>
    </Paper>
  );
};

const KeyMomentsSection = ({ keyMoments }) => {
  const theme = useTheme();
  
  return (
    <Paper elevation={0} sx={{ p: 4, mb: 4, border: `1px solid ${theme.palette.divider}` }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Timeline sx={{ color: 'primary.main' }} />
        Critical Conversation Moments
      </Typography>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Event</TableCell>
              <TableCell>Significance</TableCell>
              <TableCell>Action Taken</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {keyMoments.map((moment, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Chip label={moment.timestamp} size="small" color="primary" />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {moment.description}
                  </Typography>
                  {moment.quote && (
                    <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                      "{moment.quote}"
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={moment.significance} 
                    size="small" 
                    color={moment.significance === 'Very High' ? 'error' : 
                           moment.significance === 'High' ? 'warning' : 'default'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{moment.action_taken}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const NextStepsSection = ({ nextSteps }) => {
  const theme = useTheme();
  
  return (
    <Paper elevation={0} sx={{ p: 4, border: `1px solid ${theme.palette.divider}` }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Assignment sx={{ color: 'success.main' }} />
        Action Plan
      </Typography>
      
      <Grid container spacing={2}>
        {nextSteps.map((step, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card 
              variant="outlined" 
              sx={{ 
                height: '100%',
                borderColor: step.priority === 'Critical' ? 'error.main' : 'divider',
                borderWidth: step.priority === 'Critical' ? 2 : 1
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" sx={{ flex: 1 }}>
                    {step.action}
                  </Typography>
                  <Chip 
                    label={step.priority} 
                    size="small" 
                    color={step.priority === 'Critical' ? 'error' : 'primary'} 
                  />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Person sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2">
                    <strong>Owner:</strong> {step.owner}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Speed sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2">
                    <strong>Deadline:</strong> {step.deadline}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  <strong>Expected Impact:</strong> {step.impact}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

const ProfessionalAnalysisReport = ({ conversation, analysis }) => {
  const theme = useTheme();
  
  if (!conversation || !analysis) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No analysis data available
        </Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 800, 
            mb: 1,
            color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#1A237E'
          }}
        >
          Conversation Intelligence Report
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {conversation.title} • {conversation.dateString}
        </Typography>
      </Box>
      
      {/* Executive Summary */}
      <ExecutiveSummarySection analysis={analysis} conversation={conversation} />
      
      {/* Harvey Specter Strategic Advisory */}
      <HarveySpecterSection advice={analysis.strategicAdvice} />
      
      {/* Behavioral Analysis */}
      <BehavioralAnalysisSection 
        behavioral={analysis.behavioralAnalysis} 
        psychological={analysis.psychologicalProfile} 
      />
      
      {/* Key Moments */}
      <KeyMomentsSection keyMoments={analysis.keyMoments} />
      
      {/* Next Steps */}
      <NextStepsSection nextSteps={analysis.nextSteps} />
    </Box>
  );
};

export default ProfessionalAnalysisReport;