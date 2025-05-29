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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress
} from '@mui/material';
import {
  Warning,
  Shield,
  TrendingDown,
  MonetizationOn,
  Schedule,
  Person,
  Assessment,
  Dangerous,
  CheckCircle,
  Error
} from '@mui/icons-material';

const RiskAssessmentAnalysis = ({ conversationData }) => {
  const riskData = {
    overall_risk_score: {
      score: 34,
      level: "Medium-Low Risk",
      confidence: 88,
      summary: "Manageable risk profile with identified mitigation strategies"
    },
    risk_categories: {
      financial: {
        score: 45,
        level: "Medium",
        factors: [
          {
            risk: "Payment plan dependency",
            probability: 60,
            impact: "Medium",
            details: "Patient requires extended payment terms"
          },
          {
            risk: "Insurance limitations",
            probability: 80,
            impact: "Low",
            details: "Cosmetic procedures not covered"
          },
          {
            risk: "Competing financial priorities",
            probability: 35,
            impact: "High",
            details: "Mentioned upcoming family expenses"
          }
        ]
      },
      decision_making: {
        score: 28,
        level: "Low",
        factors: [
          {
            risk: "Spouse influence",
            probability: 70,
            impact: "Medium",
            details: "Strong reliance on partner's approval"
          },
          {
            risk: "Analysis paralysis",
            probability: 40,
            impact: "Medium",
            details: "Tendency to over-research decisions"
          },
          {
            risk: "External pressure",
            probability: 15,
            impact: "Low",
            details: "Family opinions may influence choice"
          }
        ]
      },
      competition: {
        score: 52,
        level: "Medium",
        factors: [
          {
            risk: "Price shopping",
            probability: 75,
            impact: "High",
            details: "Actively comparing multiple providers"
          },
          {
            risk: "Location convenience",
            probability: 30,
            impact: "Medium",
            details: "Considering closer alternatives"
          },
          {
            risk: "Marketing influence",
            probability: 25,
            impact: "Low",
            details: "Susceptible to promotional offers"
          }
        ]
      },
      clinical: {
        score: 22,
        level: "Low",
        factors: [
          {
            risk: "Unrealistic expectations",
            probability: 20,
            impact: "Medium",
            details: "Generally realistic about outcomes"
          },
          {
            risk: "Treatment complexity",
            probability: 35,
            impact: "Low",
            details: "Standard cosmetic case complexity"
          },
          {
            risk: "Compliance concerns",
            probability: 15,
            impact: "Low",
            details: "Strong commitment to oral health"
          }
        ]
      },
      timing: {
        score: 41,
        level: "Medium",
        factors: [
          {
            risk: "Seasonal delays",
            probability: 55,
            impact: "Medium",
            details: "Summer vacation planning impact"
          },
          {
            risk: "Work schedule conflicts",
            probability: 40,
            impact: "Low",
            details: "Professional obligations may interfere"
          },
          {
            risk: "Life event disruption",
            probability: 20,
            impact: "High",
            details: "Potential major life changes"
          }
        ]
      }
    },
    deal_protection_strategy: {
      immediate_actions: [
        {
          action: "Secure spouse buy-in",
          priority: "Critical",
          timeline: "48 hours",
          method: "Joint consultation or detailed materials for sharing"
        },
        {
          action: "Lock in treatment timeline",
          priority: "High",
          timeline: "1 week",
          method: "Schedule planning appointment with deposit"
        },
        {
          action: "Address price sensitivity",
          priority: "High",
          timeline: "24 hours",
          method: "Demonstrate value proposition and financing options"
        }
      ],
      monitoring_triggers: [
        "Radio silence for >3 days",
        "Request for additional quotes",
        "Mentions of other consultations",
        "Questions about refund policies",
        "Spouse resistance indicators"
      ]
    },
    probability_analysis: {
      conversion_scenarios: [
        {
          scenario: "Best Case",
          probability: 25,
          conditions: "Spouse approval + ideal timeline + financing accepted",
          expected_value: "$12,000"
        },
        {
          scenario: "Most Likely",
          probability: 45,
          conditions: "Some delays but eventual commitment with modifications",
          expected_value: "$10,500"
        },
        {
          scenario: "Risk Case",
          probability: 20,
          conditions: "Delayed decision leading to competitor selection",
          expected_value: "$0"
        },
        {
          scenario: "Worst Case",
          probability: 10,
          conditions: "No treatment decision made this year",
          expected_value: "$0"
        }
      ],
      weighted_expected_value: "$7,350"
    },
    early_warning_indicators: [
      {
        indicator: "Communication frequency drops",
        severity: "High",
        current_status: "Normal",
        threshold: "No response within 2 business days"
      },
      {
        indicator: "Questions about other providers",
        severity: "Medium",
        current_status: "Some mention",
        threshold: "Active comparison requests"
      },
      {
        indicator: "Payment plan hesitation",
        severity: "Medium",
        current_status: "Under discussion",
        threshold: "Rejection of financing options"
      },
      {
        indicator: "Timeline pushback",
        severity: "Low",
        current_status: "Normal",
        threshold: "Requesting delays >3 months"
      }
    ],
    mitigation_strategies: {
      financial_risks: [
        "Present multiple payment plan options",
        "Emphasize cost-per-day value calculation",
        "Offer limited-time financing incentives",
        "Provide treatment phase options"
      ],
      competitive_risks: [
        "Reinforce unique value proposition",
        "Schedule next appointment before consultation ends",
        "Provide exclusive patient benefits",
        "Demonstrate technology advantages"
      ],
      decision_risks: [
        "Include spouse in all communications",
        "Provide take-home decision materials",
        "Set soft deadlines with benefits",
        "Offer consultation extension if needed"
      ]
    },
    dental_specific_risks: {
      patient_anxiety: {
        level: "Moderate",
        triggers: ["Pain concerns", "Recovery time", "Appearance during treatment"],
        mitigation: "Detailed comfort measures explanation and gradual exposure"
      },
      aesthetic_expectations: {
        level: "Low",
        alignment: "High - realistic expectations expressed",
        risk_factors: "Minor concern about naturalness",
        management: "Extensive before/after galleries and mock-ups"
      },
      post_treatment: {
        satisfaction_risk: "Low",
        compliance_risk: "Low",
        referral_potential: "High - likely to recommend"
      }
    }
  };

  const getRiskColor = (score) => {
    if (score >= 70) return '#f44336';
    if (score >= 50) return '#FF9800';
    if (score >= 30) return '#2196F3';
    return '#4CAF50';
  };

  const getRiskLevel = (score) => {
    if (score >= 70) return 'High';
    if (score >= 50) return 'Medium';
    if (score >= 30) return 'Medium-Low';
    return 'Low';
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'High': return <Error sx={{ color: '#f44336' }} />;
      case 'Medium': return <Warning sx={{ color: '#FF9800' }} />;
      case 'Low': return <CheckCircle sx={{ color: '#4CAF50' }} />;
      default: return <Assessment />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ 
        background: 'linear-gradient(45deg, #f44336, #FF5722)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold',
        mb: 3
      }}>
        Risk Assessment Analysis
      </Typography>

      <Grid container spacing={3}>
        {/* Overall Risk Score */}
        <Grid item xs={12}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(255, 87, 34, 0.05))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(244, 67, 54, 0.2)'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Shield sx={{ fontSize: 40, color: '#f44336', mr: 2 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Overall Risk Score: {riskData.overall_risk_score.score}/100
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {riskData.overall_risk_score.level} • {riskData.overall_risk_score.summary}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <CircularProgress
                    variant="determinate"
                    value={riskData.overall_risk_score.score}
                    size={60}
                    thickness={4}
                    sx={{
                      color: getRiskColor(riskData.overall_risk_score.score),
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                      },
                    }}
                  />
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    {riskData.overall_risk_score.confidence}% Confidence
                  </Typography>
                </Box>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={riskData.overall_risk_score.score} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #f44336, #FF5722)'
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Risk Categories */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Risk Categories Breakdown
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(riskData.risk_categories).map(([category, data]) => (
              <Grid item xs={12} md={6} lg={4} key={category}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                        {category.replace('_', ' ')}
                      </Typography>
                      <Chip 
                        label={data.level}
                        size="small"
                        sx={{ 
                          backgroundColor: getRiskColor(data.score),
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Risk Score: {data.score}/100
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={data.score} 
                        sx={{ 
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: 'rgba(0,0,0,0.1)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: getRiskColor(data.score)
                          }
                        }}
                      />
                    </Box>

                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Key Risk Factors:
                    </Typography>
                    {data.factors.slice(0, 2).map((factor, index) => (
                      <Box key={index} sx={{ mb: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
                            {factor.risk}
                          </Typography>
                          <Chip 
                            label={`${factor.probability}%`}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          {factor.details}
                        </Typography>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Probability Analysis */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Conversion Probability Analysis
              </Typography>
              
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Scenario</strong></TableCell>
                      <TableCell><strong>Probability</strong></TableCell>
                      <TableCell><strong>Conditions</strong></TableCell>
                      <TableCell><strong>Value</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {riskData.probability_analysis.conversion_scenarios.map((scenario, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {scenario.scenario}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={`${scenario.probability}%`}
                            size="small"
                            sx={{ 
                              backgroundColor: scenario.scenario === 'Best Case' ? '#4CAF50' :
                                               scenario.scenario === 'Most Likely' ? '#2196F3' :
                                               scenario.scenario === 'Risk Case' ? '#FF9800' : '#f44336',
                              color: 'white'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                            {scenario.conditions}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {scenario.expected_value}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Weighted Expected Value:</strong> {riskData.probability_analysis.weighted_expected_value}
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        {/* Early Warning Indicators */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Early Warning System
              </Typography>
              
              {riskData.early_warning_indicators.map((indicator, index) => (
                <Paper key={index} sx={{ 
                  p: 2, 
                  mb: 2, 
                  backgroundColor: indicator.severity === 'High' ? 'rgba(244, 67, 54, 0.1)' :
                                   indicator.severity === 'Medium' ? 'rgba(255, 152, 0, 0.1)' :
                                   'rgba(76, 175, 80, 0.1)'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {getSeverityIcon(indicator.severity)}
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', ml: 1 }}>
                      {indicator.indicator}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    <strong>Status:</strong> {indicator.current_status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                    <strong>Threshold:</strong> {indicator.threshold}
                  </Typography>
                </Paper>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Deal Protection Strategy */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Deal Protection Strategy
              </Typography>
              
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
                Immediate Actions Required:
              </Typography>
              {riskData.deal_protection_strategy.immediate_actions.map((action, index) => (
                <Paper key={index} sx={{ p: 2, mb: 2, backgroundColor: 'rgba(76, 175, 80, 0.1)' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {action.action}
                    </Typography>
                    <Chip 
                      label={action.priority}
                      size="small"
                      sx={{ 
                        backgroundColor: action.priority === 'Critical' ? '#f44336' : '#FF9800',
                        color: 'white'
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Timeline:</strong> {action.timeline}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Method:</strong> {action.method}
                  </Typography>
                </Paper>
              ))}

              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Monitoring Triggers:
              </Typography>
              <List dense>
                {riskData.deal_protection_strategy.monitoring_triggers.map((trigger, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 20 }}>
                      <Warning sx={{ fontSize: 16, color: '#FF9800' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={trigger}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Dental-Specific Risks */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Dental-Specific Risk Profile
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Patient Anxiety Assessment
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Level:</Typography>
                  <Chip 
                    label={riskData.dental_specific_risks.patient_anxiety.level}
                    size="small"
                    sx={{ backgroundColor: '#FF9800', color: 'white' }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Triggers:</strong> {riskData.dental_specific_risks.patient_anxiety.triggers.join(', ')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Mitigation:</strong> {riskData.dental_specific_risks.patient_anxiety.mitigation}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Aesthetic Expectations
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Risk Level:</Typography>
                  <Chip 
                    label={riskData.dental_specific_risks.aesthetic_expectations.level}
                    size="small"
                    sx={{ backgroundColor: '#4CAF50', color: 'white' }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  <strong>Alignment:</strong> {riskData.dental_specific_risks.aesthetic_expectations.alignment}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Post-Treatment Outlook
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  <strong>Satisfaction Risk:</strong> {riskData.dental_specific_risks.post_treatment.satisfaction_risk}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  <strong>Compliance Risk:</strong> {riskData.dental_specific_risks.post_treatment.compliance_risk}
                </Typography>
                <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                  <strong>Referral Potential:</strong> {riskData.dental_specific_risks.post_treatment.referral_potential}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RiskAssessmentAnalysis;