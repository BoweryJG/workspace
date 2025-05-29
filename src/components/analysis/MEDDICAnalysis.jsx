import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Alert,
  useTheme,
  alpha,
  Card,
  CardContent,
  Divider,
  Stack
} from '@mui/material';
import {
  CheckCircle,
  Warning,
  Error,
  TrendingUp,
  Person,
  AttachMoney,
  Gavel,
  Timeline,
  Psychology,
  Groups,
  EmojiEvents,
  LocalHospital,
  AutoAwesome,
  MonetizationOn,
  CalendarToday
} from '@mui/icons-material';
import { DENTAL_AESTHETICS_INDUSTRY } from '../../data/dentalAestheticsSalesResearch';

const MEDDICAnalysis = ({ data }) => {
  const theme = useTheme();
  
  // Advanced MEDDIC analysis for dental aesthetics sales scenarios
  const generateDentalMEDDICScenario = (scenarioType = 'veneer_executive') => {
    const scenarios = {
      veneer_executive: {
        overall_score: 89,
        patient_profile: "High-earning executive, age 42, seeking porcelain veneers",
        treatment_value: "$18,500 (8 veneers)",
        timeline: "Ready to schedule within 2 weeks",
        components: {
          metrics: {
            score: 95,
            status: 'strong',
            findings: [
              'ROI quantified: $15K confidence boost = $180K career advancement',
              'Social impact: "I avoid photos and networking events"',
              'Professional image: "Promotion depends on executive presence"',
              'Time value: "Each delay costs me networking opportunities"'
            ],
            risks: ['Cost comparison with competitors needed'],
            recommendations: ['Present executive image ROI calculator', 'Show before/after executive transformations']
          },
          economic_buyer: {
            score: 92,
            status: 'strong',
            findings: [
              'Patient is the economic buyer (executive income)',
              'Decision authority confirmed: "I can approve this today"',
              'Budget availability: "Money is not the primary concern"',
              'Spouse involvement: "My wife supports this investment"'
            ],
            risks: ['No risks identified - clear economic buyer'],
            recommendations: ['Schedule treatment immediately', 'Provide executive financing options']
          },
          decision_criteria: {
            score: 88,
            status: 'strong',
            findings: [
              'Quality priority: "I want the best available materials"',
              'Timeline critical: "Need completion before industry conference"',
              'Natural appearance: "Must look completely natural"',
              'Practice reputation: "Need references from other executives"'
            ],
            risks: ['High expectations for perfection'],
            recommendations: ['Provide celebrity case studies', 'Guarantee natural appearance']
          },
          decision_process: {
            score: 85,
            status: 'strong',
            findings: [
              'Fast decision making: "I decide quickly in business and life"',
              'Minimal consultation time: "Show me the results, I\'ll decide"',
              'References checked: "I spoke to 3 of your executive patients"',
              'Timeline locked: "Must complete in 3 weeks maximum"'
            ],
            risks: ['Rushed timeline may impact quality perception'],
            recommendations: ['Emphasize premium process despite speed', 'Show accelerated timeline success stories']
          },
          identify_pain: {
            score: 93,
            status: 'strong',
            findings: [
              'Career impact: "My smile affects my executive presence"',
              'Social avoidance: "I don\'t smile in photos anymore"',
              'Confidence loss: "I cover my mouth when speaking"',
              'Networking impact: "I avoid speaking engagements"',
              'Age concern: "I look older than I feel"'
            ],
            risks: ['Pain well-established across multiple areas'],
            recommendations: ['Focus on immediate transformation', 'Emphasize executive presence benefits']
          },
          champion: {
            score: 87,
            status: 'strong',
            findings: [
              'Self-advocating: Patient is own champion',
              'Spouse support: "My wife wants me to do this"',
              'Peer influence: "Two colleagues had excellent results here"',
              'Internal motivation: "This is for my career advancement"'
            ],
            risks: ['Over-reliance on self-advocacy'],
            recommendations: ['Leverage spouse and colleague testimonials', 'Create peer success network']
          },
          competition: {
            score: 82,
            status: 'strong',
            findings: [
              'Evaluated 2 competitors: "I\'ve researched thoroughly"',
              'Quality differentiation: "Your materials are superior"',
              'Reputation advantage: "You have the best reviews"',
              'Price secondary: "I\'ll pay more for the best results"'
            ],
            risks: ['Competitor may offer significant discount'],
            recommendations: ['Emphasize unique value proposition', 'Secure commitment today']
          }
        }
      },
      invisalign_professional: {
        overall_score: 74,
        patient_profile: "Marketing manager, age 28, considering Invisalign",
        treatment_value: "$5,200 (comprehensive treatment)",
        timeline: "Needs 2 weeks to decide",
        components: {
          metrics: {
            score: 78,
            status: 'moderate',
            findings: [
              'Career metrics: "Appearance affects client interactions"',
              'Social confidence: "I avoid smiling in meetings"',
              'Dating impact: "Affects my confidence dating"',
              'Professional photos: "I edit my smile in LinkedIn photos"'
            ],
            risks: ['ROI less quantifiable than executive scenario'],
            recommendations: ['Create millennial-focused ROI model', 'Show social media transformation impact']
          },
          economic_buyer: {
            score: 65,
            status: 'moderate',
            findings: [
              'Personal budget: "I need to check my savings"',
              'Payment plan interest: "What financing options exist?"',
              'Parental consultation: "I might ask my parents for help"',
              'Timing concern: "Big expense right now"'
            ],
            risks: ['Budget constraints may delay decision'],
            recommendations: ['Present flexible financing options', 'Emphasize investment vs expense mindset']
          },
          decision_criteria: {
            score: 80,
            status: 'strong',
            findings: [
              'Discretion priority: "No one can know I\'m getting treatment"',
              'Lifestyle compatibility: "Must fit my active lifestyle"',
              'Treatment time: "12-18 months seems reasonable"',
              'Pain avoidance: "I hate painful procedures"'
            ],
            risks: ['Compliance concerns with removable aligners'],
            recommendations: ['Address compliance with tracking apps', 'Emphasize pain-free treatment']
          },
          decision_process: {
            score: 70,
            status: 'moderate',
            findings: [
              'Research-heavy: "I\'ve read everything online"',
              'Social validation: "I want to see more patient results"',
              'Timeline flexible: "I can wait for the right time"',
              'Multiple consultations: "I\'m seeing 2 other practices"'
            ],
            risks: ['Extended decision process allows competitor engagement'],
            recommendations: ['Accelerate decision with limited-time incentive', 'Provide social proof package']
          },
          identify_pain: {
            score: 85,
            status: 'strong',
            findings: [
              'Professional impact: "Crooked teeth affect my credibility"',
              'Photo avoidance: "I never smile naturally in pictures"',
              'Social anxiety: "I\'m self-conscious in groups"',
              'Dating confidence: "It affects my romantic relationships"'
            ],
            risks: ['Strong pain but competing with other life priorities'],
            recommendations: ['Create urgency around peak dating/career years', 'Show millennial transformation stories']
          },
          champion: {
            score: 72,
            status: 'moderate',
            findings: [
              'Friend referral: "My friend Sarah recommended you"',
              'Social media influence: "I follow dental transformation accounts"',
              'Peer pressure: "Everyone my age is getting aligners"',
              'Self-motivation: "I\'ve wanted this for years"'
            ],
            risks: ['Champion influence moderate, not internal advocate'],
            recommendations: ['Strengthen friend referral connection', 'Create peer success community']
          },
          competition: {
            score: 68,
            status: 'moderate',
            findings: [
              'Direct-to-consumer consideration: "SmileDirectClub is cheaper"',
              'Other practices: "Shopping 2 other dental offices"',
              'Price sensitivity: "Cost is a major factor"',
              'Brand preference unclear: "Not sure about brand differences"'
            ],
            risks: ['Price-focused comparison may favor competitors'],
            recommendations: ['Differentiate on quality and supervision', 'Address direct-to-consumer risks']
          }
        }
      },
      implant_retiree: {
        overall_score: 71,
        patient_profile: "Retired teacher, age 67, needs single implant",
        treatment_value: "$4,800 (implant + crown)",
        timeline: "Wants second opinion, 4-6 week timeline",
        components: {
          metrics: {
            score: 75,
            status: 'moderate',
            findings: [
              'Functional necessity: "Can\'t chew properly on that side"',
              'Oral health: "Bone loss will continue without implant"',
              'Quality of life: "Affects my ability to eat what I want"',
              'Social comfort: "I\'m embarrassed about the gap"'
            ],
            risks: ['Metrics more health-focused than cosmetic'],
            recommendations: ['Emphasize medical necessity over aesthetics', 'Show health deterioration timeline']
          },
          economic_buyer: {
            score: 60,
            status: 'weak',
            findings: [
              'Fixed income concern: "Living on pension and social security"',
              'Insurance limitation: "Medicare doesn\'t cover implants"',
              'Spouse consultation: "Need to discuss with my husband"',
              'Major purchase hesitation: "This is a big expense for us"'
            ],
            risks: ['Economic constraints significant barrier'],
            recommendations: ['Explore insurance alternatives', 'Present senior-friendly financing options']
          },
          decision_criteria: {
            score: 82,
            status: 'strong',
            findings: [
              'Safety priority: "I want the safest procedure possible"',
              'Experience requirement: "How many implants have you done?"',
              'Recovery concern: "I can\'t be down for long"',
              'Longevity focus: "I want this to last the rest of my life"'
            ],
            risks: ['High safety expectations require careful handling'],
            recommendations: ['Emphasize experience and safety record', 'Provide detailed recovery timeline']
          },
          decision_process: {
            score: 70,
            status: 'moderate',
            findings: [
              'Cautious approach: "I don\'t make quick decisions anymore"',
              'Second opinion planned: "I want to get another opinion"',
              'Family involvement: "My daughter will help me decide"',
              'Extended timeline: "I have time to think about this"'
            ],
            risks: ['Extended process allows for decision fatigue'],
            recommendations: ['Respect cautious approach', 'Involve family in education process']
          },
          identify_pain: {
            score: 88,
            status: 'strong',
            findings: [
              'Functional limitation: "I can only chew on one side"',
              'Bone deterioration: "My jawbone is shrinking"',
              'Dietary restriction: "I avoid certain foods now"',
              'Social embarrassment: "I\'m self-conscious about the gap"',
              'Adjacent teeth shifting: "My other teeth are moving"'
            ],
            risks: ['Strong pain but cost sensitivity may override'],
            recommendations: ['Focus on progressive deterioration', 'Show long-term cost of inaction']
          },
          champion: {
            score: 78,
            status: 'moderate',
            findings: [
              'Family support: "My daughter researched this for me"',
              'Dentist referral: "My dentist recommended an implant"',
              'Friend experience: "My neighbor had a good experience"',
              'Health motivation: "I want to maintain my health"'
            ],
            risks: ['Multiple influencers but no strong internal champion'],
            recommendations: ['Strengthen family advocate role', 'Leverage referring dentist relationship']
          },
          competition: {
            score: 65,
            status: 'moderate',
            findings: [
              'Second opinion planned: "I want to compare recommendations"',
              'Cost comparison: "I need to compare prices"',
              'Denture consideration: "Is a partial denture cheaper?"',
              'Timeline flexibility: "I\'m not in a rush to decide"'
            ],
            risks: ['Cost-focused comparison may favor cheaper alternatives'],
            recommendations: ['Differentiate implant benefits vs alternatives', 'Show long-term value proposition']
          }
        }
      }
    };
    
    return scenarios[scenarioType] || scenarios.veneer_executive;
  };

  const meddic = data || generateDentalMEDDICScenario('veneer_executive');
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'strong': return 'success';
      case 'moderate': return 'warning';
      case 'weak': return 'error';
      default: return 'default';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'strong': return <CheckCircle />;
      case 'moderate': return <Warning />;
      case 'weak': return <Error />;
      default: return <Warning />;
    }
  };
  
  const componentIcons = {
    metrics: <MonetizationOn />,
    economic_buyer: <Person />,
    decision_criteria: <AutoAwesome />,
    decision_process: <CalendarToday />,
    identify_pain: <LocalHospital />,
    champion: <EmojiEvents />,
    competition: <Groups />
  };
  
  const componentTitles = {
    metrics: 'Metrics',
    economic_buyer: 'Economic Buyer',
    decision_criteria: 'Decision Criteria',
    decision_process: 'Decision Process',
    identify_pain: 'Identify Pain',
    champion: 'Champion',
    competition: 'Competition'
  };
  
  return (
    <Box>
      {/* Overall Score */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(76, 175, 80, 0.02) 100%)',
          border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
          borderRadius: 3
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Case Conversion Score
              </Typography>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontWeight: 900,
                  fontSize: '4rem',
                  color: meddic.overall_score >= 80 ? 'success.main' : 
                         meddic.overall_score >= 60 ? 'warning.main' : 'error.main'
                }}
              >
                {meddic.overall_score}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Patient Conversion Probability
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              Patient Analysis Summary
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>{meddic.patient_profile}</strong> • Treatment Value: {meddic.treatment_value}
            </Typography>
            <Typography variant="body1" paragraph>
              This {meddic.overall_score >= 80 ? 'high-probability' : meddic.overall_score >= 60 ? 'moderate-probability' : 'challenging'} dental case shows {meddic.overall_score >= 80 ? 'excellent' : meddic.overall_score >= 60 ? 'good' : 'limited'} conversion potential. 
              Strong pain points and treatment urgency are evident. Timeline: {meddic.timeline}.
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {meddic.overall_score >= 80 && (
                <Chip
                  icon={<TrendingUp />}
                  label="High Case Value"
                  color="success"
                />
              )}
              {meddic.components.identify_pain.score >= 80 && (
                <Chip
                  icon={<LocalHospital />}
                  label="Strong Treatment Need"
                  color="success"
                />
              )}
              {meddic.components.economic_buyer.score < 70 && (
                <Chip
                  icon={<Warning />}
                  label="Financing Concerns"
                  color="warning"
                />
              )}
              {meddic.components.competition.score < 75 && (
                <Chip
                  icon={<Groups />}
                  label="Competitive Pressure"
                  color="warning"
                />
              )}
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Component Analysis */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        Patient Consultation Analysis (MEDDIC Framework)
      </Typography>
      
      <Grid container spacing={3}>
        {Object.entries(meddic.components).map(([key, component]) => (
          <Grid item xs={12} md={6} key={key}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                border: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              <CardContent>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette[getStatusColor(component.status)].main, 0.1),
                      color: theme.palette[getStatusColor(component.status)].main,
                      mr: 2
                    }}
                  >
                    {componentIcons[key]}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {componentTitles[key]}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={component.score}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          flex: 1,
                          bgcolor: alpha(theme.palette[getStatusColor(component.status)].main, 0.1),
                          '& .MuiLinearProgress-bar': {
                            bgcolor: theme.palette[getStatusColor(component.status)].main,
                          }
                        }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {component.score}%
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    icon={getStatusIcon(component.status)}
                    label={component.status.toUpperCase()}
                    size="small"
                    color={getStatusColor(component.status)}
                  />
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                {/* Findings */}
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 700 }}>
                  Key Findings
                </Typography>
                <List dense sx={{ mb: 2 }}>
                  {component.findings.map((finding, idx) => (
                    <ListItem key={idx} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={finding}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
                
                {/* Risks */}
                {component.risks.length > 0 && (
                  <>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 700, color: 'error.main' }}>
                      Risks
                    </Typography>
                    <List dense sx={{ mb: 2 }}>
                      {component.risks.map((risk, idx) => (
                        <ListItem key={idx} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Warning sx={{ fontSize: 16, color: 'error.main' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={risk}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
                
                {/* Recommendations */}
                <Alert 
                  severity="info" 
                  variant="outlined"
                  sx={{ 
                    '& .MuiAlert-message': { width: '100%' },
                    borderColor: theme.palette[getStatusColor(component.status)].main,
                    color: theme.palette[getStatusColor(component.status)].main
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 700 }}>
                    Recommended Actions
                  </Typography>
                  {component.recommendations.map((rec, idx) => (
                    <Typography key={idx} variant="body2" sx={{ mt: 0.5 }}>
                      • {rec}
                    </Typography>
                  ))}
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Next Steps */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mt: 4,
          background: theme.palette.mode === 'dark'
            ? alpha(theme.palette.primary.main, 0.05)
            : alpha(theme.palette.primary.main, 0.02),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          borderRadius: 2
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
          Treatment Consultation Action Plan
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Alert severity="error" variant="outlined">
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Immediate (Today)
              </Typography>
              <Typography variant="body2">
                {meddic.components.economic_buyer.score < 70 ? '• Address financing options immediately' : '• Schedule treatment appointment'}<br />
                {meddic.components.champion.score < 75 ? '• Strengthen patient advocacy' : '• Confirm treatment timeline'}<br />
                {meddic.components.competition.score < 75 ? '• Address competitor comparisons' : '• Secure treatment commitment'}
              </Typography>
            </Alert>
          </Grid>
          <Grid item xs={12} md={4}>
            <Alert severity="warning" variant="outlined">
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Short-term (This Week)
              </Typography>
              <Typography variant="body2">
                • Complete treatment planning<br />
                • Provide detailed cost breakdown<br />
                • Schedule pre-treatment consultation<br />
                • Address any remaining concerns
              </Typography>
            </Alert>
          </Grid>
          <Grid item xs={12} md={4}>
            <Alert severity="success" variant="outlined">
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Follow-up (Next 2 Weeks)
              </Typography>
              <Typography variant="body2">
                • Begin treatment phase<br />
                • Monitor patient satisfaction<br />
                • Document success metrics<br />
                • Request referral opportunities
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default MEDDICAnalysis;