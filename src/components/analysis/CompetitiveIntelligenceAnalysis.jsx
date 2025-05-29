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
  Avatar
} from '@mui/material';
import {
  TrendingUp,
  Star,
  Warning,
  MonetizationOn,
  Schedule,
  LocationOn,
  Phone,
  Assessment,
  Lightbulb,
  Shield
} from '@mui/icons-material';

const CompetitiveIntelligenceAnalysis = ({ conversationData }) => {
  const competitiveData = {
    competitor_mentions: {
      total_mentions: 4,
      identified_competitors: [
        {
          name: "SmileCare Dental Group",
          mention_frequency: 2,
          context: "Price comparison",
          patient_perception: "More affordable but longer wait times",
          competitive_advantage: "Lower prices",
          our_differentiator: "Faster appointments, premium materials"
        },
        {
          name: "Elite Cosmetic Dentistry",
          mention_frequency: 1,
          context: "Treatment options",
          patient_perception: "High-end but very expensive",
          competitive_advantage: "Luxury positioning",
          our_differentiator: "Better value for premium quality"
        },
        {
          name: "Downtown Dental Associates",
          mention_frequency: 1,
          context: "Location convenience",
          patient_perception: "Convenient location",
          competitive_advantage: "Central location",
          our_differentiator: "Better technology, more experienced team"
        }
      ]
    },
    competitive_threats: {
      high_priority: [
        {
          threat: "Price-based competition",
          severity: 85,
          description: "Patient comparing multiple quotes for smile makeover",
          impact: "Potential $8,000 case loss",
          response_strategy: "Emphasize value, payment plans, and superior outcomes"
        }
      ],
      medium_priority: [
        {
          threat: "Location convenience",
          severity: 60,
          description: "Patient considering closer dental office",
          impact: "Potential patient acquisition loss",
          response_strategy: "Highlight unique expertise and technology"
        }
      ],
      low_priority: [
        {
          threat: "Insurance network differences",
          severity: 35,
          description: "Minor variations in insurance coverage",
          impact: "Small cost difference",
          response_strategy: "Explain overall value proposition"
        }
      ]
    },
    market_positioning: {
      our_strengths: [
        "Advanced 3D imaging technology",
        "20+ years of cosmetic dentistry experience",
        "Same-day crown capabilities",
        "Comprehensive smile design process",
        "Flexible payment options"
      ],
      competitor_weaknesses: [
        "Limited technology (SmileCare)",
        "High prices without value justification (Elite)",
        "Less experienced in cosmetics (Downtown)",
        "Limited appointment availability",
        "Outdated equipment in some practices"
      ],
      market_opportunities: [
        "Growing demand for aesthetic dentistry",
        "Patients seeking technology-advanced practices",
        "Increasing acceptance of elective procedures",
        "Social media influence on smile aesthetics"
      ]
    },
    competitive_responses: {
      effective_responses: [
        {
          competitor_claim: "We offer the lowest prices in town",
          our_response: "We focus on value - the best results per dollar invested",
          effectiveness: 90,
          patient_reaction: "Understood value proposition"
        },
        {
          competitor_claim: "More convenient downtown location",
          our_response: "Our patients find the extra 10 minutes worth it for our expertise",
          effectiveness: 85,
          patient_reaction: "Agreed that expertise matters more"
        }
      ],
      missed_opportunities: [
        {
          competitor_claim: "They have more payment options",
          missed_response: "Could have detailed our flexible financing",
          recommendation: "Present comprehensive payment plan comparison"
        }
      ]
    },
    industry_insights: {
      market_trends: [
        "Increasing demand for minimally invasive procedures",
        "Growth in same-day dentistry",
        "Rising importance of digital smile design",
        "Patient preference for technology-advanced practices"
      ],
      pricing_intelligence: {
        average_market_price: "$6,500",
        our_positioning: "$7,200",
        value_justification: "Premium materials, advanced technology, experienced team",
        market_acceptance: "78% of patients understand price difference"
      },
      competitive_landscape: {
        total_competitors: 12,
        direct_competitors: 4,
        market_share: "18%",
        growth_opportunity: "High - underserved premium segment"
      }
    },
    recommendations: {
      immediate_actions: [
        "Develop competitor comparison sheet for common objections",
        "Create value proposition presentation for price discussions",
        "Gather more patient testimonials highlighting unique benefits"
      ],
      strategic_initiatives: [
        "Monitor competitor pricing and service changes quarterly",
        "Develop partnerships to enhance convenience factor",
        "Invest in additional technology differentiators"
      ]
    }
  };

  const getSeverityColor = (severity) => {
    if (severity >= 80) return '#f44336';
    if (severity >= 60) return '#FF9800';
    return '#4CAF50';
  };

  const getThreatLevel = (severity) => {
    if (severity >= 80) return 'High';
    if (severity >= 60) return 'Medium';
    return 'Low';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ 
        background: 'linear-gradient(45deg, #9C27B0, #E91E63)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold',
        mb: 3
      }}>
        Competitive Intelligence Analysis
      </Typography>

      <Grid container spacing={3}>
        {/* Overview */}
        <Grid item xs={12}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(233, 30, 99, 0.05))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(156, 39, 176, 0.2)'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assessment sx={{ fontSize: 40, color: '#9C27B0', mr: 2 }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Competitive Landscape Overview
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {competitiveData.competitor_mentions.total_mentions} competitor mentions • {competitiveData.competitor_mentions.identified_competitors.length} competitors identified
                  </Typography>
                </Box>
              </Box>
              <Alert severity="info">
                <Typography variant="body2">
                  <strong>Market Position:</strong> {competitiveData.industry_insights.competitive_landscape.market_share} market share with high growth opportunity in premium segment
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        {/* Identified Competitors */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Identified Competitors
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Competitor</strong></TableCell>
                  <TableCell><strong>Mentions</strong></TableCell>
                  <TableCell><strong>Context</strong></TableCell>
                  <TableCell><strong>Their Advantage</strong></TableCell>
                  <TableCell><strong>Our Differentiator</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {competitiveData.competitor_mentions.identified_competitors.map((competitor, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 1, bgcolor: '#9C27B0', width: 32, height: 32 }}>
                          {competitor.name.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {competitor.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={competitor.mention_frequency}
                        size="small"
                        sx={{ backgroundColor: '#9C27B0', color: 'white' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{competitor.context}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {competitor.competitive_advantage}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                        {competitor.our_differentiator}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Competitive Threats */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Competitive Threats Assessment
              </Typography>
              
              {Object.entries(competitiveData.competitive_threats).map(([priority, threats]) => (
                <Box key={priority} sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ 
                    fontWeight: 'bold', 
                    textTransform: 'capitalize',
                    color: priority === 'high_priority' ? '#f44336' : 
                           priority === 'medium_priority' ? '#FF9800' : '#4CAF50',
                    mb: 1
                  }}>
                    {priority.replace('_', ' ')} Threats
                  </Typography>
                  
                  {threats.map((threat, index) => (
                    <Paper key={index} sx={{ 
                      p: 2, 
                      mb: 2, 
                      border: `1px solid ${getSeverityColor(threat.severity)}20`,
                      backgroundColor: `${getSeverityColor(threat.severity)}05`
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          {threat.threat}
                        </Typography>
                        <Chip 
                          label={`${threat.severity}% Severity`}
                          size="small"
                          sx={{ 
                            backgroundColor: getSeverityColor(threat.severity),
                            color: 'white'
                          }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {threat.description}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#f44336', mb: 1 }}>
                        <strong>Impact:</strong> {threat.impact}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                        <strong>Response:</strong> {threat.response_strategy}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Market Positioning */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Market Positioning
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Star sx={{ color: '#4CAF50', fontSize: 20, mr: 1 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    Our Strengths
                  </Typography>
                </Box>
                <List dense>
                  {competitiveData.market_positioning.our_strengths.map((strength, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 20 }}>
                        <Box sx={{ 
                          width: 6, 
                          height: 6, 
                          borderRadius: '50%', 
                          backgroundColor: '#4CAF50' 
                        }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={strength}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Warning sx={{ color: '#FF9800', fontSize: 20, mr: 1 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    Competitor Weaknesses
                  </Typography>
                </Box>
                <List dense>
                  {competitiveData.market_positioning.competitor_weaknesses.slice(0, 3).map((weakness, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 20 }}>
                        <Box sx={{ 
                          width: 6, 
                          height: 6, 
                          borderRadius: '50%', 
                          backgroundColor: '#FF9800' 
                        }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={weakness}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Lightbulb sx={{ color: '#2196F3', fontSize: 20, mr: 1 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    Market Opportunities
                  </Typography>
                </Box>
                <List dense>
                  {competitiveData.market_positioning.market_opportunities.slice(0, 3).map((opportunity, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 20 }}>
                        <Box sx={{ 
                          width: 6, 
                          height: 6, 
                          borderRadius: '50%', 
                          backgroundColor: '#2196F3' 
                        }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={opportunity}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Pricing Intelligence */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Pricing Intelligence
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Market Average vs Our Pricing
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Market Average:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {competitiveData.industry_insights.pricing_intelligence.average_market_price}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">Our Price:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#9C27B0' }}>
                    {competitiveData.industry_insights.pricing_intelligence.our_positioning}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                <strong>Value Justification:</strong> {competitiveData.industry_insights.pricing_intelligence.value_justification}
              </Typography>
              
              <LinearProgress 
                variant="determinate" 
                value={78} 
                sx={{ 
                  mt: 1,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: 'rgba(156, 39, 176, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#9C27B0'
                  }
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {competitiveData.industry_insights.pricing_intelligence.market_acceptance} market acceptance of premium pricing
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Effective Responses */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Effective Competitive Responses
              </Typography>
              
              {competitiveData.competitive_responses.effective_responses.map((response, index) => (
                <Paper key={index} sx={{ p: 2, mb: 2, backgroundColor: 'rgba(76, 175, 80, 0.1)' }}>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1 }}>
                    <strong>Claim:</strong> "{response.competitor_claim}"
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4CAF50', mb: 1 }}>
                    <strong>Our Response:</strong> "{response.our_response}"
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      {response.patient_reaction}
                    </Typography>
                    <Chip 
                      label={`${response.effectiveness}% Effective`}
                      size="small"
                      sx={{ backgroundColor: '#4CAF50', color: 'white' }}
                    />
                  </Box>
                </Paper>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Strategic Recommendations */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Strategic Recommendations
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, color: '#f44336' }}>
                    Immediate Actions
                  </Typography>
                  <List>
                    {competitiveData.recommendations.immediate_actions.map((action, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <Shield sx={{ color: '#f44336' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={action}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, color: '#2196F3' }}>
                    Strategic Initiatives
                  </Typography>
                  <List>
                    {competitiveData.recommendations.strategic_initiatives.map((initiative, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <TrendingUp sx={{ color: '#2196F3' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={initiative}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompetitiveIntelligenceAnalysis;