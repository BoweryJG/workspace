import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/material';
import {
  TrendingUp,
  Schedule,
  Phone,
  Email,
  Assignment,
  Star,
  Warning,
  CheckCircle,
  PlayArrow,
  Person,
  MonetizationOn
} from '@mui/icons-material';

const NextBestActionAnalysis = ({ conversationData }) => {
  const actionData = {
    primary_recommendation: {
      action: "Schedule 3D Smile Design Consultation",
      priority: "High",
      confidence: 92,
      expected_outcome: "$12,000 case closure",
      timeline: "Within 48 hours",
      reasoning: "Patient showed high engagement with aesthetic outcomes and 3D visualization"
    },
    immediate_actions: [
      {
        id: 1,
        action: "Send 3D smile preview video",
        priority: "Critical",
        timeframe: "Within 2 hours",
        effort: "Low",
        impact: "High",
        confidence: 89,
        details: "Patient was most engaged during 3D preview discussion",
        tools_needed: ["3D software", "Patient photos"],
        expected_result: "Increased excitement and urgency"
      },
      {
        id: 2,
        action: "Follow up on payment plan discussion",
        priority: "High",
        timeframe: "Today",
        effort: "Medium",
        impact: "High",
        confidence: 85,
        details: "Address specific financing concerns mentioned",
        tools_needed: ["Payment calculator", "Financing options sheet"],
        expected_result: "Remove financial barrier"
      },
      {
        id: 3,
        action: "Schedule spouse consultation call",
        priority: "Medium",
        timeframe: "Within 24 hours",
        effort: "Low",
        impact: "Medium",
        confidence: 78,
        details: "Patient mentioned needing spouse input on decision",
        tools_needed: ["Calendar link", "Consultation agenda"],
        expected_result: "Include decision influencer"
      }
    ],
    strategic_sequence: [
      {
        step: 1,
        action: "Immediate Follow-up",
        description: "Send personalized 3D smile video within 2 hours",
        success_criteria: "Video opened and viewed completely",
        next_trigger: "Patient engagement with video content"
      },
      {
        step: 2,
        action: "Address Concerns",
        description: "Follow-up call to discuss financing and timeline",
        success_criteria: "Patient comfort with investment and schedule",
        next_trigger: "Positive response to financial solutions"
      },
      {
        step: 3,
        action: "Include Influencers",
        description: "Invite spouse to consultation or provide materials",
        success_criteria: "Spouse engagement and support",
        next_trigger: "Family consensus on treatment"
      },
      {
        step: 4,
        action: "Schedule Treatment",
        description: "Book treatment planning appointment",
        success_criteria: "Treatment start date confirmed",
        next_trigger: "First appointment completed"
      }
    ],
    risk_mitigation: [
      {
        risk: "Price shopping with competitors",
        probability: 65,
        impact: "High",
        mitigation: "Emphasize unique value proposition and limited-time incentives",
        monitoring: "Track competitor research activity"
      },
      {
        risk: "Decision delay due to spouse consultation",
        probability: 45,
        impact: "Medium",
        mitigation: "Proactively include spouse in next conversation",
        monitoring: "Follow up on family discussion timeline"
      },
      {
        risk: "Seasonal delay (summer vacation)",
        probability: 30,
        impact: "Medium",
        mitigation: "Present treatment completion before vacation as benefit",
        monitoring: "Confirm vacation schedule"
      }
    ],
    personalization_factors: {
      patient_profile: {
        decision_style: "Analytical with emotional validation",
        primary_motivator: "Aesthetic confidence boost",
        main_concern: "Natural-looking results",
        communication_preference: "Visual demonstrations with detailed explanations"
      },
      customized_approach: [
        "Use before/after cases with similar starting points",
        "Emphasize natural appearance in all communications",
        "Provide detailed treatment process documentation",
        "Include patient testimonials about confidence improvements"
      ]
    },
    success_probability: {
      base_conversion_rate: 45,
      with_recommended_actions: 78,
      factors_increasing_success: [
        "High engagement with 3D visualization (+15%)",
        "Clear aesthetic goals identified (+10%)",
        "Strong rapport established (+8%)",
        "Financial solutions discussed (+12%)"
      ],
      factors_decreasing_success: [
        "Spouse not involved in decision (-10%)",
        "Price comparison activity (-8%)",
        "Timeline concerns (-5%)"
      ]
    },
    competitor_intelligence: {
      likely_alternatives: [
        {
          competitor: "SmileCare Dental Group",
          differentiation_strategy: "Emphasize technology advantage and experience",
          key_message: "Advanced 3D planning ensures predictable results"
        },
        {
          competitor: "Elite Cosmetic Dentistry",
          differentiation_strategy: "Position as better value for same quality",
          key_message: "Same premium outcomes at 20% less investment"
        }
      ]
    },
    communication_templates: {
      immediate_email: {
        subject: "Your Personal 3D Smile Preview - [Patient Name]",
        key_points: ["Attach 3D video", "Reference specific discussion points", "Clear next step"],
        call_to_action: "Schedule your consultation to bring this smile to life"
      },
      follow_up_call: {
        opening: "Reference exciting 3D preview reaction",
        agenda: ["Address financing questions", "Confirm timeline preferences", "Schedule next step"],
        closing: "Secure specific commitment with calendar booking"
      }
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return '#f44336';
      case 'High': return '#FF9800';
      case 'Medium': return '#2196F3';
      case 'Low': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'High': return <TrendingUp sx={{ color: '#4CAF50' }} />;
      case 'Medium': return <TrendingUp sx={{ color: '#FF9800' }} />;
      case 'Low': return <TrendingUp sx={{ color: '#9E9E9E' }} />;
      default: return <TrendingUp />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ 
        background: 'linear-gradient(45deg, #4CAF50, #8BC34A)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold',
        mb: 3
      }}>
        Next Best Action Analysis
      </Typography>

      <Grid container spacing={3}>
        {/* Primary Recommendation */}
        <Grid item xs={12}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.05))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(76, 175, 80, 0.2)'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Star sx={{ fontSize: 40, color: '#4CAF50', mr: 2 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {actionData.primary_recommendation.action}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Expected Outcome: {actionData.primary_recommendation.expected_outcome} • Timeline: {actionData.primary_recommendation.timeline}
                  </Typography>
                </Box>
                <Chip 
                  label={`${actionData.primary_recommendation.confidence}% Confidence`}
                  sx={{ 
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />
              </Box>
              <Alert severity="success">
                <Typography variant="body2">
                  <strong>Reasoning:</strong> {actionData.primary_recommendation.reasoning}
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        {/* Immediate Actions */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Immediate Actions Required
          </Typography>
          
          {actionData.immediate_actions.map((action, index) => (
            <Card key={action.id} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 2 }}>
                        {action.action}
                      </Typography>
                      <Chip 
                        label={action.priority}
                        size="small"
                        sx={{ 
                          backgroundColor: getPriorityColor(action.priority),
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {action.details}
                    </Typography>
                  </Box>
                  {getImpactIcon(action.impact)}
                </Box>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="text.secondary">Timeframe</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {action.timeframe}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="text.secondary">Effort</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {action.effort}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="text.secondary">Impact</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {action.impact}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="text.secondary">Confidence</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {action.confidence}%
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Expected Result:</strong> {action.expected_result}
                  </Typography>
                  <Button 
                    variant="contained" 
                    size="small"
                    startIcon={<PlayArrow />}
                    sx={{ 
                      backgroundColor: '#4CAF50',
                      '&:hover': { backgroundColor: '#45a049' }
                    }}
                  >
                    Execute
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Success Probability */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: 'fit-content' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Success Probability
              </Typography>
              
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h3" sx={{ 
                  fontWeight: 'bold',
                  color: '#4CAF50'
                }}>
                  {actionData.success_probability.with_recommended_actions}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  With Recommended Actions
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  (vs {actionData.success_probability.base_conversion_rate}% base rate)
                </Typography>
              </Box>

              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#4CAF50' }}>
                Success Factors
              </Typography>
              <List dense>
                {actionData.success_probability.factors_increasing_success.map((factor, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 20 }}>
                      <CheckCircle sx={{ fontSize: 16, color: '#4CAF50' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={factor}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>

              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#f44336', mt: 2 }}>
                Risk Factors
              </Typography>
              <List dense>
                {actionData.success_probability.factors_decreasing_success.map((factor, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 20 }}>
                      <Warning sx={{ fontSize: 16, color: '#f44336' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={factor}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Strategic Sequence */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Strategic Action Sequence
              </Typography>
              
              <Stepper orientation="vertical">
                {actionData.strategic_sequence.map((step, index) => (
                  <Step key={step.step} active={true}>
                    <StepLabel>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {step.action}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {step.description}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Success Criteria:</strong> {step.success_criteria}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                        <strong>Next Trigger:</strong> {step.next_trigger}
                      </Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Grid>

        {/* Risk Mitigation */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Risk Mitigation Plan
              </Typography>
              
              {actionData.risk_mitigation.map((risk, index) => (
                <Paper key={index} sx={{ 
                  p: 2, 
                  mb: 2, 
                  backgroundColor: 'rgba(255, 152, 0, 0.1)',
                  border: '1px solid rgba(255, 152, 0, 0.2)'
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {risk.risk}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip 
                        label={`${risk.probability}%`}
                        size="small"
                        variant="outlined"
                      />
                      <Chip 
                        label={risk.impact}
                        size="small"
                        sx={{ 
                          backgroundColor: risk.impact === 'High' ? '#f44336' : '#FF9800',
                          color: 'white'
                        }}
                      />
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Mitigation:</strong> {risk.mitigation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Monitor:</strong> {risk.monitoring}
                  </Typography>
                </Paper>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Personalization Factors */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Patient-Specific Approach
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Patient Profile
                </Typography>
                {Object.entries(actionData.personalization_factors.patient_profile).map(([key, value]) => (
                  <Box key={key} sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      <strong>{key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong> {value}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Customized Communication
              </Typography>
              <List dense>
                {actionData.personalization_factors.customized_approach.map((approach, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 20 }}>
                      <Person sx={{ fontSize: 16, color: '#2196F3' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={approach}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Communication Templates */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Ready-to-Use Templates
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Email sx={{ color: '#2196F3', mr: 1 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    Immediate Email
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Subject:</strong> {actionData.communication_templates.immediate_email.subject}
                </Typography>
                <List dense>
                  {actionData.communication_templates.immediate_email.key_points.map((point, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.25 }}>
                      <ListItemIcon sx={{ minWidth: 20 }}>
                        <Box sx={{ 
                          width: 4, 
                          height: 4, 
                          borderRadius: '50%', 
                          backgroundColor: '#2196F3' 
                        }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={point}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                  CTA: {actionData.communication_templates.immediate_email.call_to_action}
                </Typography>
              </Box>

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Phone sx={{ color: '#FF9800', mr: 1 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    Follow-up Call Script
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Opening:</strong> {actionData.communication_templates.follow_up_call.opening}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Agenda:</strong> {actionData.communication_templates.follow_up_call.agenda.join(', ')}
                </Typography>
                <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                  <strong>Closing:</strong> {actionData.communication_templates.follow_up_call.closing}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NextBestActionAnalysis;