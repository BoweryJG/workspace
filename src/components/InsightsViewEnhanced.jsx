import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Divider,
  Paper,
  LinearProgress,
  useTheme,
  Fade,
  Zoom
} from '@mui/material';
import {
  Psychology,
  EmojiObjects,
  Timeline,
  Assignment,
  Person,
  ExpandMore,
  CheckCircle,
  Warning,
  TrendingUp,
  QuestionAnswer,
  Gavel,
  AutoAwesome
} from '@mui/icons-material';
import { 
  GlassCard, 
  Badge, 
  ScoreBadge,
  ProgressBar,
  IconWrapper 
} from './StyledComponents';
import { generateMockConversation } from '../utils/mockDataGenerator';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`insights-tabpanel-${index}`}
      aria-labelledby={`insights-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const InsightsView = ({ analysisResults: propResults }) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate mock data if none provided
    if (!propResults) {
      setTimeout(() => {
        const mockConversation = generateMockConversation();
        setAnalysisResults(mockConversation);
        setLoading(false);
      }, 1000);
    } else {
      setAnalysisResults(propResults);
      setLoading(false);
    }
  }, [propResults]);

  if (loading || !analysisResults) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress />
        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
          Analyzing conversation insights...
        </Typography>
      </Box>
    );
  }

  const { analysis } = analysisResults;

  return (
    <Fade in timeout={600}>
      <Box>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800,
              mb: 2,
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, #A78BFA 0%, #67E8F9 100%)'
                : 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Conversation Intelligence Report
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {analysisResults.title}
          </Typography>
        </Box>

        {/* Score Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <GlassCard sx={{ textAlign: 'center', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Overall Score</Typography>
                <ScoreBadge score={analysisResults.score} />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  {analysis.overallAssessment.momentum}
                </Typography>
              </CardContent>
            </GlassCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <GlassCard sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Deal Probability</Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h4" color="primary.main">
                    {analysis.overallAssessment.deal_probability}%
                  </Typography>
                  <ProgressBar 
                    value={analysis.overallAssessment.deal_probability} 
                    color="primary" 
                    animated 
                  />
                </Box>
              </CardContent>
            </GlassCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <GlassCard sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Critical Success Factors</Typography>
                <Box sx={{ mt: 2 }}>
                  {analysis.overallAssessment.critical_factors.map((factor, index) => (
                    <Chip
                      key={index}
                      label={factor}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                      icon={<Warning />}
                      color="warning"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>
            </GlassCard>
          </Grid>
        </Grid>

        {/* Tabs */}
        <GlassCard>
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab icon={<Psychology />} label="Behavioral Analysis" />
            <Tab icon={<Person />} label="Psychological Profile" />
            <Tab icon={<Gavel />} label="Strategic Advice" />
            <Tab icon={<QuestionAnswer />} label="Socratic Analysis" />
            <Tab icon={<Timeline />} label="Key Moments" />
            <Tab icon={<Assignment />} label="Next Steps" />
          </Tabs>

          {/* Behavioral Analysis Tab */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              {analysis.behavioralAnalysis && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                      {analysis.behavioralAnalysis.title}
                    </Typography>
                  </Grid>
                  {analysis.behavioralAnalysis.findings.map((finding, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Zoom in timeout={300 + index * 100}>
                        <Paper sx={{ p: 3, height: '100%' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <IconWrapper color="secondary" size="small">
                              <EmojiObjects />
                            </IconWrapper>
                            <Typography variant="h6" sx={{ ml: 2 }}>
                              {finding.indicator || finding.trigger || finding.expression}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {finding.significance || finding.description || finding.context}
                          </Typography>
                          {finding.examples && (
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Examples:
                              </Typography>
                              <Box sx={{ mt: 1 }}>
                                {finding.examples.map((example, i) => (
                                  <Chip 
                                    key={i} 
                                    label={example} 
                                    size="small" 
                                    sx={{ mr: 0.5, mb: 0.5 }} 
                                  />
                                ))}
                              </Box>
                            </Box>
                          )}
                          {finding.timestamp && (
                            <Typography variant="caption" color="primary.main">
                              @ {finding.timestamp}
                            </Typography>
                          )}
                        </Paper>
                      </Zoom>
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </TabPanel>

          {/* Psychological Profile Tab */}
          <TabPanel value={tabValue} index={1}>
            {analysis.psychologicalProfile && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" gutterBottom>
                      {analysis.psychologicalProfile.primary_type}
                    </Typography>
                    <Divider />
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>Personality Traits</Typography>
                  <List>
                    {Object.entries(analysis.psychologicalProfile.traits).map(([key, values]) => (
                      <ListItem key={key}>
                        <ListItemText
                          primary={key.charAt(0).toUpperCase() + key.slice(1)}
                          secondary={values.join(', ')}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>Communication Style</Typography>
                  <List>
                    {Object.entries(analysis.psychologicalProfile.communication_style).map(([key, value]) => (
                      <ListItem key={key}>
                        <ListItemText
                          primary={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                          secondary={value}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>Buying Signals</Typography>
                  <List>
                    {analysis.psychologicalProfile.buying_signals.map((signal, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText primary={signal} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                
                <Grid item xs={12}>
                  <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                    <Typography variant="h6" gutterBottom>
                      Recommended Influence Strategy
                    </Typography>
                    <Typography>
                      {analysis.psychologicalProfile.influence_strategy}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            )}
          </TabPanel>

          {/* Strategic Advice Tab */}
          <TabPanel value={tabValue} index={2}>
            {analysis.strategicAdvice && (
              <Box>
                <Paper 
                  sx={{ 
                    p: 3, 
                    mb: 3, 
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(167, 139, 250, 0.1) 0%, rgba(103, 232, 249, 0.1) 100%)'
                      : 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                    border: `1px solid ${theme.palette.primary.main}`
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        width: 60, 
                        height: 60, 
                        bgcolor: 'primary.main',
                        mr: 2 
                      }}
                    >
                      <Gavel />
                    </Avatar>
                    <Box>
                      <Typography variant="h5">Harvey Specter Says:</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Senior Partner Advisory
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 3 }}>
                    "{analysis.strategicAdvice.opening_move}"
                  </Typography>
                </Paper>

                <Grid container spacing={3}>
                  {analysis.strategicAdvice.key_insights.map((insight, index) => (
                    <Grid item xs={12} key={index}>
                      <Accordion defaultExpanded={index === 0}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="h6">
                            Insight {index + 1}: {insight.observation}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box>
                            <Typography variant="body1" paragraph>
                              <strong>Reality:</strong> {insight.reality}
                            </Typography>
                            <Typography variant="body1" color="primary.main">
                              <strong>Action:</strong> {insight.action}
                            </Typography>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>Power Moves</Typography>
                  <List>
                    {analysis.strategicAdvice.power_moves.map((move, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <AutoAwesome color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={move} />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Paper sx={{ p: 3, mt: 3, bgcolor: 'success.main', color: 'success.contrastText' }}>
                  <Typography variant="h6" gutterBottom>Closing Strategy</Typography>
                  <Typography>{analysis.strategicAdvice.closing_strategy}</Typography>
                  <Divider sx={{ my: 2, bgcolor: 'success.contrastText' }} />
                  <Typography variant="body2">
                    <strong>Mindset:</strong> {analysis.strategicAdvice.mindset}
                  </Typography>
                </Paper>
              </Box>
            )}
          </TabPanel>

          {/* Socratic Analysis Tab */}
          <TabPanel value={tabValue} index={3}>
            {analysis.socraticAnalysis && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5" gutterBottom>
                    Questions Analysis
                  </Typography>
                </Grid>
                
                {analysis.socraticAnalysis.questions_asked.map((q, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                      <Typography variant="h6" color="primary.main" gutterBottom>
                        "{q.question}"
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Chip 
                          label={q.type} 
                          size="small" 
                          color="secondary" 
                          sx={{ mr: 1 }} 
                        />
                        <Chip 
                          label={`Effectiveness: ${q.effectiveness}`} 
                          size="small" 
                          color={q.effectiveness === 'Very High' ? 'success' : 'primary'} 
                        />
                      </Box>
                      <Typography variant="body2" sx={{ mt: 2 }}>
                        <strong>Response:</strong> {q.response_quality}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <strong>Insights:</strong> {q.insights_gained}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
                
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                    Missed Opportunities
                  </Typography>
                  {analysis.socraticAnalysis.missed_opportunities.map((miss, index) => (
                    <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: 'warning.light' }}>
                      <Typography variant="body1">
                        <strong>Context:</strong> {miss.context}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <strong>Should have asked:</strong> "{miss.missed_question}"
                      </Typography>
                      <Typography variant="caption">
                        <strong>Impact:</strong> {miss.impact}
                      </Typography>
                    </Paper>
                  ))}
                </Grid>
              </Grid>
            )}
          </TabPanel>

          {/* Key Moments Tab */}
          <TabPanel value={tabValue} index={4}>
            <Timeline>
              {analysis.keyMoments.map((moment, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Paper sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label={moment.timestamp} 
                          size="small" 
                          color="primary" 
                          sx={{ mr: 2 }} 
                        />
                        <Typography variant="h6">{moment.description}</Typography>
                      </Box>
                      <Badge variant={moment.type === 'Breakthrough' ? 'success' : 'info'}>
                        {moment.type}
                      </Badge>
                    </Box>
                    {moment.quote && (
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontStyle: 'italic', 
                          mb: 2, 
                          pl: 2, 
                          borderLeft: '3px solid',
                          borderColor: 'primary.main' 
                        }}
                      >
                        "{moment.quote}"
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                      <strong>Action taken:</strong> {moment.action_taken}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Timeline>
          </TabPanel>

          {/* Next Steps Tab */}
          <TabPanel value={tabValue} index={5}>
            <Grid container spacing={3}>
              {analysis.nextSteps.map((step, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper 
                    sx={{ 
                      p: 3, 
                      height: '100%',
                      border: step.priority === 'Critical' ? '2px solid' : '1px solid',
                      borderColor: step.priority === 'Critical' ? 'error.main' : 'divider'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6">{step.action}</Typography>
                      <Chip 
                        label={step.priority} 
                        size="small" 
                        color={step.priority === 'Critical' ? 'error' : 'primary'} 
                      />
                    </Box>
                    <Typography variant="body2" paragraph>
                      <strong>Owner:</strong> {step.owner}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      <strong>Deadline:</strong> {step.deadline}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Impact:</strong> {step.impact}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </GlassCard>
      </Box>
    </Fade>
  );
};

export default InsightsView;