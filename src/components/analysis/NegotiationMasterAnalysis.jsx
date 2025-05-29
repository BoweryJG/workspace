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
  Avatar,
  Divider,
  Alert,
  LinearProgress
} from '@mui/material';
import {
  Gavel,
  Psychology,
  TrendingUp,
  Star,
  CheckCircle,
  Warning,
  MonetizationOn,
  Schedule,
  Lightbulb,
  EmojiEvents,
  LocalHospital,
  AutoAwesome,
  CalendarToday
} from '@mui/icons-material';
import { DENTAL_AESTHETICS_INDUSTRY } from '../../data/dentalAestheticsSalesResearch';

const NegotiationMasterAnalysis = ({ conversationData }) => {
  // Advanced dental negotiation scenarios using industry research
  const generateDentalNegotiationData = (scenarioType = 'executive_veneers') => {
    const dentalScenarios = {
      executive_veneers: {
        harvey_specter_assessment: {
          overall_score: 89,
          negotiation_style: "Executive Power Closer",
          confidence_level: "Harvey-Level Authority",
          patient_profile: "C-Suite Executive, 45, $500K+ income",
          treatment_value: "$22,000 (10 veneers + whitening)",
          summary: "Masterful positioning with executive-level authority and urgency creation"
        },
        power_dynamics: {
          position_strength: {
            score: 94,
            factors: [
              "Elite expertise positioned from opening: '20 years, 3,000+ veneers'",
              "Exclusive materials advantage: 'Ultra-thin e.max only 3 practices in city'",
              "Celebrity client portfolio: 'Featured in Forbes for CEO smile transformations'",
              "Technology supremacy: 'Our 3D imaging is NASA-level precision'"
            ]
          },
          leverage_creation: {
            score: 91,
            opportunities: [
              "Calendar exclusivity: 'Next executive slot available in 6 weeks'",
              "Seasonal positioning: 'Conference season starts in 8 weeks'",
              "Economic timing: 'Tax advantage if completed this quarter'",
              "Social urgency: 'Board photos for annual report next month'"
            ],
            executed_leverage: [
              "Competitor timeline disadvantage revealed strategically",
              "Premium positioning vs commodity alternatives",
              "Executive peer testimonials from similar companies"
            ]
          }
        },
      },
      millennial_invisalign: {
        harvey_specter_assessment: {
          overall_score: 82,
          negotiation_style: "Aspirational Authority Builder",
          confidence_level: "High Professional Control",
          patient_profile: "Marketing Manager, 28, $75K income",
          treatment_value: "$6,500 (Invisalign + whitening)",
          summary: "Strong millennial-focused positioning with lifestyle integration mastery"
        },
        power_dynamics: {
          position_strength: {
            score: 88,
            factors: [
              "Social proof dominance: '5,000+ Instagram transformations'",
              "Career advancement positioning: 'Your smile is your personal brand'",
              "Technology integration: 'AI-powered treatment planning'",
              "Lifestyle compatibility: 'Designed for your active life'"
            ]
          },
          leverage_creation: {
            score: 85,
            opportunities: [
              "Peak dating years urgency: 'Best years for confidence investment'",
              "Career momentum timing: 'Promotion season alignment'",
              "Social calendar leverage: 'Wedding season approaching'",
              "Financing advantage: 'Lowest rates of the year ending soon'"
            ],
            executed_leverage: [
              "Direct-to-consumer risks highlighted professionally",
              "Supervision vs DIY treatment differentiation",
              "Professional network value positioning"
            ]
          }
        },
      },
      retiree_implants: {
        harvey_specter_assessment: {
          overall_score: 76,
          negotiation_style: "Respectful Health Authority",
          confidence_level: "Measured Professional Control",
          patient_profile: "Retired Teacher, 68, Fixed Income",
          treatment_value: "$8,500 (2 implants + crowns)",
          summary: "Dignified health-focused negotiation with family-inclusive approach"
        },
        power_dynamics: {
          position_strength: {
            score: 82,
            factors: [
              "Medical necessity authority: '30 years implant specialization'",
              "Health consequence expertise: 'Bone loss prevention specialist'",
              "Senior care experience: '2,000+ successful senior implant cases'",
              "Conservative approach: 'We prioritize your comfort and healing'"
            ]
          },
          leverage_creation: {
            score: 71,
            opportunities: [
              "Health deterioration timeline: 'Early intervention prevents complications'",
              "Quality of life impact: 'Enjoy your favorite foods again'",
              "Insurance timing: 'Benefit year maximization strategy'",
              "Family influence: 'Your daughter researched us specifically'"
            ],
            executed_leverage: [
              "Alternative treatment limitations explained clearly",
              "Long-term cost comparison with removable options",
              "Health insurance maximization strategy"
            ]
          }
        },
      }
    };
    return dentalScenarios[scenarioType] || dentalScenarios.executive_veneers;
  };

  const dentalNegotiationBase = generateDentalNegotiationData('executive_veneers');
  
  const negotiationData = {
    ...dentalNegotiationBase,
    harvey_techniques_applied: {
      used_effectively: [
        {
          technique: "Information Control",
          example: "Revealed premium veneer options only after establishing executive status and image needs",
          harvey_rating: 9.2,
          impact: "Elite positioning established - patient expecting premium investment"
        },
        {
          technique: "Strategic Scarcity",
          example: "Only 2 executive consultation slots remaining this quarter for conference season",
          harvey_rating: 8.8,
          impact: "Created urgency without desperation - accelerated decision timeline"
        },
        {
          technique: "Value Anchoring",
          example: "Positioned as career investment: '$22K smile = $200K+ promotion credibility'",
          harvey_rating: 9.1,
          impact: "ROI framework established - price becomes secondary to outcome"
        },
        {
          technique: "Social Proof Authority",
          example: "Shared CEO client transformations: 'Just finished Amazon VP's veneers last month'",
          harvey_rating: 8.9,
          impact: "Peer-level validation - increased confidence in provider choice"
        },
        {
          technique: "Preemptive Objection Handling",
          example: "Addressed timeline concerns before raised: 'Executives need results, not delays'",
          harvey_rating: 8.7,
          impact: "Smooth consultation flow - anticipated and resolved resistance"
        }
      ],
      improvement_opportunities: [
        {
          technique: "Controlled Vulnerability",
          gap: "Could share strategic practice limitations to increase exclusivity perception",
          harvey_approach: "We only accept 3 executive cases monthly to maintain quality standards",
          potential_impact: "Enhanced premium positioning and urgency"
        },
        {
          technique: "Alternative Choice Architecture",
          gap: "Presented single option vs multiple tiers of executive packages",
          harvey_approach: "Executive, CEO, and Chairman-level veneer packages with clear differentiators",
          potential_impact: "Patient self-selects highest tier for status consistency"
        }
      ]
    },
    closing_power: {
      techniques_used: [
        "Executive assumptive language: 'When we begin your transformation...'",
        "Status-based next steps: 'Your executive consultation coordinator will...'",
        "Investment benefit summarization: 'Enhanced presence, career advancement, confidence ROI'",
        "Peer social proof integration: 'Like other C-suite clients, you'll see..'"
      ],
      harvey_enhancements: [
        "Add strategic silence after investment discussion",
        "Use 'when you're ready for this level of transformation' vs 'if interested'",
        "Create executive-only commitment pathway with special scheduling",
        "Position decision as business investment with immediate implementation"
      ],
      effectiveness_score: 92
    },
    persuasion_mastery: {
      emotional_intelligence: {
        score: 91,
        strengths: [
          "Excellent reading of executive communication style preferences",
          "Professional confidence matching client's business authority level",
          "Appropriate urgency creation without pressure tactics"
        ]
      },
      logical_frameworks: {
        score: 94,
        application: [
          "ROI analysis: Career advancement value quantification",
          "Timeline optimization: Conference and networking season alignment",
          "Risk mitigation: Premium provider vs discount alternative consequences"
        ]
      },
      influence_tactics: {
        score: 89,
        harvey_favorites: [
          {
            tactic: "Executive Social Proof",
            usage: "Masterful - Named specific industry leaders and their transformations",
            harvey_level: "Harvey would be proud - peer-level validation"
          },
          {
            tactic: "Authority Positioning",
            usage: "Excellent - Established as go-to provider for executive aesthetics",
            harvey_level: "Perfect authority without arrogance"
          },
          {
            tactic: "Strategic Scarcity",
            usage: "Well-executed - Calendar limitations positioned professionally",
            harvey_level: "Could add more exclusivity layers"
          },
          {
            tactic: "Value Reframing",
            usage: "Brilliant - Transformed expense into career investment",
            harvey_level: "Harvey-level reframing mastery"
          }
        ]
      }
    },
    dental_specific_mastery: {
      aesthetic_psychology: {
        score: 88,
        application: [
          "Executive image impact: Connected smile to leadership presence",
          "Confidence correlation: Linked appearance to professional performance",
          "Social capital: Positioned smile as networking asset"
        ]
      },
      treatment_positioning: {
        score: 92,
        strategies: [
          "Premium materials as competitive advantage",
          "Exclusive technology as differentiator",
          "Accelerated timeline as executive service",
          "Concierge experience as status marker"
        ]
      },
      objection_prevention: {
        score: 85,
        preemptive_moves: [
          "Investment vs expense mindset established early",
          "Timeline urgency created before scheduling discussion",
          "Quality differentiation positioned before price reveal",
          "Executive peer validation before decision pressure"
        ]
      }
    },
    negotiation_outcomes: {
      primary_win: {
        achievement: "Executive veneer case secured",
        value: "$22,000 treatment commitment",
        timeline: "Scheduled within 48 hours",
        harvey_assessment: "Masterful close - exceeded expectations"
      },
      secondary_benefits: [
        "Referral potential: C-suite network access",
        "Case study value: Executive transformation portfolio",
        "Premium positioning: Enhanced practice reputation",
        "Revenue impact: 3x average case value"
      ],
      leverage_maintained: [
        "Future availability scarcity established",
        "Executive-tier service expectations set",
        "Premium pricing tolerance confirmed",
        "Peer referral pathway created"
      ]
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ 
        background: 'linear-gradient(45deg, #1976D2, #42A5F5)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold',
        mb: 3
      }}>
        Harvey Specter Negotiation Analysis
      </Typography>

      <Grid container spacing={3}>
        {/* Harvey Assessment Card */}
        <Grid item xs={12}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(66, 165, 245, 0.05))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(25, 118, 210, 0.2)'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Gavel sx={{ fontSize: 40, color: '#1976D2', mr: 2 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {negotiationData.harvey_specter_assessment.negotiation_style}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {negotiationData.harvey_specter_assessment.patient_profile} • {negotiationData.harvey_specter_assessment.treatment_value}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {negotiationData.harvey_specter_assessment.summary}
                  </Typography>
                </Box>
                <Chip 
                  label={`${negotiationData.harvey_specter_assessment.overall_score}/100`}
                  sx={{ 
                    backgroundColor: '#1976D2',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Power Dynamics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
                Power Dynamics Assessment
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Position Strength: {negotiationData.power_dynamics.position_strength.score}/100
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={negotiationData.power_dynamics.position_strength.score} 
                  sx={{ mb: 2, height: 8, borderRadius: 4 }}
                />
                <List dense>
                  {negotiationData.power_dynamics.position_strength.factors.map((factor, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircle sx={{ fontSize: 18, color: 'success.main' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={factor}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Leverage Creation: {negotiationData.power_dynamics.leverage_creation.score}/100
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={negotiationData.power_dynamics.leverage_creation.score} 
                  sx={{ mb: 2, height: 8, borderRadius: 4 }}
                />
                <List dense>
                  {negotiationData.power_dynamics.leverage_creation.opportunities.map((opportunity, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Lightbulb sx={{ fontSize: 18, color: 'warning.main' }} />
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

        {/* Harvey Techniques Applied */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                <EmojiEvents sx={{ mr: 1, verticalAlign: 'middle' }} />
                Harvey Techniques Mastery
              </Typography>
              
              {negotiationData.harvey_techniques_applied.used_effectively.map((technique, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, backgroundColor: 'rgba(76, 175, 80, 0.1)', borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {technique.technique}
                    </Typography>
                    <Chip 
                      label={`${technique.harvey_rating}/10`}
                      size="small"
                      color="success"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {technique.example}
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                    Impact: {technique.impact}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Dental-Specific Mastery */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                <LocalHospital sx={{ mr: 1, verticalAlign: 'middle' }} />
                Dental Negotiation Mastery
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Aesthetic Psychology ({negotiationData.dental_specific_mastery.aesthetic_psychology.score}/100)
                  </Typography>
                  <List dense>
                    {negotiationData.dental_specific_mastery.aesthetic_psychology.application.map((item, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <Psychology sx={{ fontSize: 16, color: 'primary.main' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Treatment Positioning ({negotiationData.dental_specific_mastery.treatment_positioning.score}/100)
                  </Typography>
                  <List dense>
                    {negotiationData.dental_specific_mastery.treatment_positioning.strategies.map((strategy, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <AutoAwesome sx={{ fontSize: 16, color: 'warning.main' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={strategy}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Objection Prevention ({negotiationData.dental_specific_mastery.objection_prevention.score}/100)
                  </Typography>
                  <List dense>
                    {negotiationData.dental_specific_mastery.objection_prevention.preemptive_moves.map((move, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={move}
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

        {/* Negotiation Outcomes */}
        <Grid item xs={12}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05))',
            border: '1px solid rgba(76, 175, 80, 0.2)'
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                <MonetizationOn sx={{ mr: 1, verticalAlign: 'middle' }} />
                Harvey-Level Outcomes Achieved
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, backgroundColor: 'rgba(76, 175, 80, 0.1)', borderRadius: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                      {negotiationData.negotiation_outcomes.primary_win.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {negotiationData.negotiation_outcomes.primary_win.achievement}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                      "{negotiationData.negotiation_outcomes.primary_win.harvey_assessment}"
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Strategic Benefits Secured:
                  </Typography>
                  <List dense>
                    {negotiationData.negotiation_outcomes.secondary_benefits.map((benefit, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <Star sx={{ fontSize: 16, color: 'warning.main' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={benefit}
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

export default NegotiationMasterAnalysis;