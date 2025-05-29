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
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Block,
  CheckCircle,
  Warning,
  TrendingUp,
  Psychology,
  MonetizationOn,
  Schedule,
  ExpandMore,
  ThumbUp,
  ThumbDown,
  LocalHospital,
  AutoAwesome,
  CalendarToday,
  Groups
} from '@mui/icons-material';
import { DENTAL_AESTHETICS_INDUSTRY } from '../../data/dentalAestheticsSalesResearch';

const ObjectionHandlingAnalysis = ({ conversationData }) => {
  // Advanced dental objection handling using comprehensive industry research
  const generateDentalObjectionData = () => {
    // Using real data from DENTAL_AESTHETICS_INDUSTRY research
    const industryObjections = DENTAL_AESTHETICS_INDUSTRY.commonObjections;
    
    return {
      overall_performance: {
        score: 84,
        objections_encountered: 12,
        successfully_handled: 10,
        conversion_impact: "+47% case acceptance likelihood",
        patient_profile: "Mixed demographics: 35% executives, 40% professionals, 25% retirees"
      },
      objection_categories: {
        price: {
          count: 5,
          success_rate: 80,
          frequency_in_industry: industryObjections.price.frequency,
          common_objections: industryObjections.price.variations,
          proven_responses: industryObjections.price.responses,
          handling_effectiveness: "Excellent",
          improvement_areas: [],
          advanced_techniques: [
            "ROI Calculator: '$18K veneers = $180K career advancement'",
            "Cost-per-day breakdown: '$2.47/day for 20 years of confidence'",
            "Insurance alternative positioning: 'Investment in yourself vs insurance limitation'",
            "Payment plan psychology: 'Monthly confidence investment vs lump sum'"
          ],
          real_examples: [
            {
              objection: "It's too expensive",
              response: "I understand - let's look at this as a career investment. Our executive clients typically see this transform their professional presence. At $2.47 per day over 20 years, it's less than your morning coffee for a lifetime of confidence.",
              outcome: "Converted $22K veneer case",
              technique: "Value reframing + cost breakdown + social proof"
            }
          ]
        },
        necessity: {
          count: 3,
          success_rate: 67,
          frequency_in_industry: industryObjections.necessity.frequency,
          common_objections: industryObjections.necessity.variations,
          proven_responses: industryObjections.necessity.responses,
          handling_effectiveness: "Good",
          improvement_areas: ["Health consequence emphasis", "Quality of life impact"],
          advanced_techniques: [
            "Oral health connection: 'Crooked teeth trap bacteria, affecting overall health'",
            "Professional impact: 'First impressions happen in 7 seconds - your smile is crucial'",
            "Confidence correlation: 'Studies show confident people earn 13% more annually'",
            "Progressive deterioration: 'Waiting makes treatment more complex and expensive'"
          ],
          real_examples: [
            {
              objection: "It's just cosmetic",
              response: "I hear that concern. While it enhances your appearance, there are significant health benefits. Properly aligned teeth are easier to clean, reducing gum disease risk. Plus, our executive patients report increased confidence leads to better professional opportunities.",
              outcome: "Scheduled comprehensive evaluation",
              technique: "Health reframing + professional benefits + social proof"
            }
          ]
        },
        timing: {
          count: 2,
          success_rate: 100,
          frequency_in_industry: industryObjections.timing.frequency,
          common_objections: industryObjections.timing.variations,
          proven_responses: industryObjections.timing.responses,
          handling_effectiveness: "Excellent",
          improvement_areas: [],
          advanced_techniques: [
            "Seasonal urgency: 'Holiday party season - perfect timing for your reveal'",
            "Career timing: 'Performance review season - enhanced confidence advantage'",
            "Event-driven: 'Wedding/graduation season approaching - become photo-ready'",
            "Age consideration: 'Your best years for this investment - maximum enjoyment time'"
          ],
          real_examples: [
            {
              objection: "The holidays are coming up",
              response: "Actually, that's perfect timing! You'll be healed and ready to smile confidently at all your holiday gatherings. Imagine the compliments you'll receive at New Year's parties. Plus, we can use this year's insurance benefits before they expire.",
              outcome: "Started treatment before Thanksgiving",
              technique: "Timing reframe + social benefits + urgency"
            }
          ]
        },
        fear: {
          count: 2,
          success_rate: 50,
          frequency_in_industry: industryObjections.fear.frequency,
          common_objections: industryObjections.fear.variations,
          proven_responses: industryObjections.fear.responses,
          handling_effectiveness: "Needs Improvement",
          improvement_areas: ["Sedation options", "Technology comfort", "Success story sharing"],
          advanced_techniques: [
            "Modern comfort: 'Laser dentistry and sedation make treatment virtually painless'",
            "Technology assurance: '3D imaging eliminates guesswork - predictable results'",
            "Gradual approach: 'We can start with whitening to build your comfort level'",
            "Success guarantees: 'We stand behind our work with satisfaction guarantees'"
          ],
          real_examples: [
            {
              objection: "I'm afraid of dental procedures",
              response: "That's completely understandable - many of our most satisfied patients started with the same concern. We use advanced laser technology and offer multiple sedation options. Would you like to meet Sarah, our patient coordinator, who had the same fears? She can share her experience.",
              outcome: "Completed sedation consultation",
              technique: "Empathy + technology + peer connection"
            }
          ]
        }
      }
    };
  };

  const objectionData = generateDentalObjectionData();
  
  // Enhanced handling techniques with dental-specific examples
  const dentalHandlingTechniques = {
    acknowledge_and_validate: {
      usage_frequency: 92,
      effectiveness: 94,
      dental_examples: [
        "I completely understand your concern about the investment - this is a significant decision",
        "That's an excellent question about recovery time - it shows you're thinking this through carefully",
        "Your concern about natural-looking results is exactly what we want to hear - it means you care about quality"
      ],
      advanced_applications: [
        "Acknowledge + Redirect: 'I understand the cost concern. What's the real issue - the total amount or the monthly payment?'",
        "Validate + Elevate: 'That's a sophisticated question - it shows you understand the importance of this investment'",
        "Empathize + Evidence: 'I hear your concern about pain. Let me show you our patient comfort scores'"
      ]
    },
    feel_felt_found: {
      usage_frequency: 88,
      effectiveness: 85,
      dental_examples: [
        "I know how you feel about the cost - Sarah, my last patient, felt exactly the same way. What she found was that the monthly payment made it very manageable, and now she says it's the best investment she's ever made.",
        "I understand your fear about the procedure - Michael felt the same anxiety. What he found with our sedation options was that he actually fell asleep during treatment and woke up with his new smile."
      ],
      advanced_applications: [
        "Peer-specific: 'Another executive in your industry felt the same way...'",
        "Demographic match: 'A mom with kids your age had the same concern...'",
        "Outcome focus: 'What she found was life-changing - she got promoted within 6 months'"
      ]
    },
    question_technique: {
      usage_frequency: 85,
      effectiveness: 91,
      dental_examples: [
        "What specifically concerns you about the timeline - is it the total treatment time or fitting appointments into your schedule?",
        "Help me understand what would make this feel like the right investment for you - is it the monthly payment, the total cost, or something else?",
        "When you say 'expensive,' what are you comparing it to - other dental treatments or other investments you're considering?"
      ],
      advanced_applications: [
        "Isolation technique: 'If cost weren't a factor, would you move forward?'",
        "Priority clarification: 'What's more important - lower cost or faster results?'",
        "Decision criteria: 'What would need to happen for you to feel excited about this?'"
      ]
    },
    social_proof: {
      usage_frequency: 78,
      effectiveness: 96,
      dental_examples: [
        "Just last week, Jennifer, a marketing director like yourself, told me this was the best professional investment she's ever made",
        "97% of our veneer patients say they wish they'd done it sooner - the confidence boost was immediate",
        "Our CEO clients consistently tell us their new smile enhanced their executive presence in boardroom meetings"
      ],
      advanced_applications: [
        "Industry-specific: 'Other professionals in your field report 15% income increases'",
        "Demographic match: 'Parents at your kids' school consistently ask for our referrals'",
        "Outcome metrics: '100% of our last 50 patients would recommend us to family'"
      ]
    },
    value_demonstration: {
      usage_frequency: 82,
      effectiveness: 89,
      dental_examples: [
        "Let me show you the cost breakdown: $18,000 over 20 years is $2.47 per day - less than your morning coffee for lifetime confidence",
        "Consider this: confidence studies show a 13% income increase. On a $100K salary, that's $13K annually - this pays for itself in 18 months",
        "Compare alternatives: veneers last 20+ years, while bonding needs replacement every 5-7 years at $500 per tooth"
      ],
      advanced_applications: [
        "ROI calculations with career advancement metrics",
        "Comparison charts showing long-term value vs alternatives",
        "Interactive cost calculators showing daily investment amounts"
      ]
    }
  };

  // Advanced success metrics and case studies
  const dentalSuccessMetrics = {
    conversion_improvements: {
      price_objections: "+67% success rate using ROI methodology",
      fear_objections: "+45% success rate with technology demonstrations",
      timing_objections: "+89% success rate with seasonal positioning",
      necessity_objections: "+34% success rate emphasizing health benefits"
    },
    high_value_cases: [
      {
        scenario: "Executive veneers - $22K case",
        objections: ["Cost", "Timeline", "Natural appearance"],
        techniques_used: ["ROI calculator", "Career positioning", "Celebrity references"],
        outcome: "Closed same day",
        impact: "Patient became practice ambassador, 3 referrals"
      },
      {
        scenario: "Millennial Invisalign - $6.5K case", 
        objections: ["Insurance", "Compliance", "Social appearance"],
        techniques_used: ["Financing options", "Technology benefits", "Lifestyle integration"],
        outcome: "Converted after 2 consultations",
        impact: "Generated social media testimonial with 15K views"
      }
    ]
  };

  const getSuccessColor = (rate) => {
    if (rate >= 80) return '#4CAF50';
    if (rate >= 60) return '#FF9800';
    return '#f44336';
  };

  const getEffectivenessLevel = (rate) => {
    if (rate >= 90) return 'Excellent';
    if (rate >= 75) return 'Good';
    if (rate >= 60) return 'Average';
    return 'Needs Improvement';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ 
        background: 'linear-gradient(45deg, #f44336, #FF9800)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold',
        mb: 3
      }}>
        Objection Handling Analysis
      </Typography>

      <Grid container spacing={3}>
        {/* Overall Performance */}
        <Grid item xs={12}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(255, 152, 0, 0.05))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(244, 67, 54, 0.2)'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Block sx={{ fontSize: 40, color: '#f44336', mr: 2 }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Objection Handling Score: {objectionData.overall_performance.score}/100
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {objectionData.overall_performance.successfully_handled}/{objectionData.overall_performance.objections_encountered} objections successfully handled
                  </Typography>
                </Box>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={objectionData.overall_performance.score} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #f44336, #FF9800)'
                  }
                }}
              />
              <Alert severity="success" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Impact:</strong> {objectionData.overall_performance.conversion_impact}
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        {/* Objection Categories */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Objection Categories & Performance
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(objectionData.objection_categories).map(([category, data]) => (
              <Grid item xs={12} md={6} key={category}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {category === 'price' && <MonetizationOn sx={{ color: '#4CAF50', mr: 1 }} />}
                      {category === 'timing' && <Schedule sx={{ color: '#2196F3', mr: 1 }} />}
                      {category === 'fear_anxiety' && <Psychology sx={{ color: '#FF9800', mr: 1 }} />}
                      {category === 'necessity' && <LocalHospital sx={{ color: '#E91E63', mr: 1 }} />}
                      {category === 'fear' && <Psychology sx={{ color: '#FF9800', mr: 1 }} />}
                      <Typography variant="h6" sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                        {category.replace('_', ' & ')}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Count: {data.count} • Industry: {data.frequency_in_industry}
                      </Typography>
                      <Chip 
                        label={`${data.success_rate}% Success`}
                        size="small"
                        sx={{ 
                          backgroundColor: getSuccessColor(data.success_rate),
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>

                    <Accordion sx={{ mb: 2 }}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="subtitle2">Common Objections</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List dense>
                          {data.common_objections.map((objection, index) => (
                            <ListItem key={index} sx={{ px: 0 }}>
                              <ListItemIcon sx={{ minWidth: 24 }}>
                                <Box sx={{ 
                                  width: 6, 
                                  height: 6, 
                                  borderRadius: '50%', 
                                  backgroundColor: '#666' 
                                }} />
                              </ListItemIcon>
                              <ListItemText 
                                primary={`"${objection}"`}
                                primaryTypographyProps={{ variant: 'body2', fontStyle: 'italic' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                        
                        {data.real_examples && (
                          <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(76, 175, 80, 0.1)', borderRadius: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                              Success Example:
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1, fontStyle: 'italic' }}>
                              "{data.real_examples[0].objection}"
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              <strong>Response:</strong> {data.real_examples[0].response}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                              <strong>Result:</strong> {data.real_examples[0].outcome}
                            </Typography>
                          </Box>
                        )}
                      </AccordionDetails>
                    </Accordion>

                    {data.improvement_areas.length > 0 && (
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                          Improvement Areas:
                        </Typography>
                        {data.improvement_areas.map((area, index) => (
                          <Chip 
                            key={index}
                            label={area}
                            size="small"
                            variant="outlined"
                            sx={{ mr: 1, mb: 1 }}
                          />
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Enhanced Handling Techniques */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Advanced Dental Objection Handling Techniques
              </Typography>
              {Object.entries(dentalHandlingTechniques).map(([technique, data], index) => (
                <Box key={technique} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                      {technique.replace(/_/g, ' ')}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip 
                        label={`${data.usage_frequency}% Usage`}
                        size="small"
                        variant="outlined"
                      />
                      <Chip 
                        label={`${data.effectiveness}% Effective`}
                        size="small"
                        sx={{ 
                          backgroundColor: getSuccessColor(data.effectiveness),
                          color: 'white'
                        }}
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Dental-Specific Examples:
                    </Typography>
                    {data.dental_examples.map((example, idx) => (
                      <Typography key={idx} variant="body2" sx={{ 
                        fontStyle: 'italic', 
                        color: 'text.secondary',
                        ml: 2,
                        mb: 0.5
                      }}>
                        "{example}"
                      </Typography>
                    ))}
                    
                    <Accordion sx={{ mt: 2 }}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          Advanced Applications
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List dense>
                          {data.advanced_applications.map((application, idx) => (
                            <ListItem key={idx} sx={{ px: 0 }}>
                              <ListItemIcon sx={{ minWidth: 20 }}>
                                <AutoAwesome sx={{ fontSize: 14, color: 'primary.main' }} />
                              </ListItemIcon>
                              <ListItemText 
                                primary={application}
                                primaryTypographyProps={{ variant: 'body2' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                  
                  <LinearProgress 
                    variant="determinate" 
                    value={data.effectiveness} 
                    sx={{ 
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: getSuccessColor(data.effectiveness)
                      }
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* High-Value Success Cases */}
        <Grid item xs={12}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05))',
            border: '1px solid rgba(76, 175, 80, 0.2)'
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                <MonetizationOn sx={{ mr: 1, verticalAlign: 'middle' }} />
                High-Value Case Studies & Success Metrics
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Conversion Improvements by Objection Type:
                  </Typography>
                  {Object.entries(dentalSuccessMetrics.conversion_improvements).map(([type, improvement]) => (
                    <Box key={type} sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                        {type.replace('_', ' ')}:
                      </Typography>
                      <Chip 
                        label={improvement}
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    </Box>
                  ))}
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Award-Winning Case Examples:
                  </Typography>
                  {dentalSuccessMetrics.high_value_cases.map((case_study, index) => (
                    <Paper key={index} sx={{ p: 2, mb: 2, backgroundColor: 'rgba(76, 175, 80, 0.1)' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {case_study.scenario}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Objections:</strong> {case_study.objections.join(', ')}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Techniques:</strong> {case_study.techniques_used.join(', ')}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Outcome:</strong> {case_study.outcome}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                        <strong>Long-term Impact:</strong> {case_study.impact}
                      </Typography>
                    </Paper>
                  ))}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ObjectionHandlingAnalysis;