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
  Avatar,
  Radar,
  ResponsiveContainer
} from '@mui/material';
import {
  Psychology,
  Person,
  TrendingUp,
  EmojiEmotions,
  Speed,
  Group,
  Star,
  Lightbulb,
  Assessment
} from '@mui/icons-material';

const PersonalityInsightsAnalysis = ({ conversationData }) => {
  const personalityData = {
    overall_profile: {
      primary_type: "Analytical Harmonizer",
      confidence_score: 87,
      behavioral_summary: "Detail-oriented decision maker who values relationships and seeks consensus before major commitments"
    },
    disc_analysis: {
      dominance: 25,
      influence: 45,
      steadiness: 75,
      conscientiousness: 85,
      primary_style: "CS - Analytical Supportive",
      secondary_traits: ["Methodical", "Relationship-focused", "Quality-oriented"]
    },
    communication_style: {
      preference: "Detailed explanations with visual proof",
      pace: "Moderate - likes time to process",
      tone_preference: "Professional but warm",
      information_processing: "Visual and logical evidence",
      decision_timeline: "Extended evaluation period",
      trust_building: "Through expertise demonstration and patient testimonials"
    },
    motivational_drivers: {
      primary: "Quality and long-term satisfaction",
      secondary: "Social approval and confidence boost",
      fears: ["Making wrong decision", "Unnatural results", "Wasted investment"],
      values: ["Expertise", "Natural aesthetics", "Value for money", "Family harmony"]
    },
    dental_specific_psychology: {
      anxiety_triggers: [
        "Pain during procedures",
        "Recovery time impact",
        "Visible treatment signs",
        "Financial commitment"
      ],
      confidence_builders: [
        "Before/after photo galleries",
        "3D treatment previews",
        "Patient testimonial videos",
        "Detailed treatment explanations"
      ],
      decision_influencers: [
        "Spouse opinion (80% weight)",
        "Professional reputation (70% weight)",
        "Cost-benefit analysis (65% weight)",
        "Recovery timeline (55% weight)"
      ]
    },
    behavioral_patterns: {
      information_gathering: {
        research_style: "Thorough online research before appointments",
        question_types: "Detailed process and outcome inquiries",
        comparison_behavior: "Multiple consultation seeking",
        timeline: "Extended evaluation period (2-4 weeks typical)"
      },
      social_validation: {
        importance: 78,
        sources: ["Family opinions", "Online reviews", "Friend referrals"],
        influence_on_decision: "High - seeks consensus before commitment"
      },
      risk_tolerance: {
        level: "Conservative",
        score: 35,
        preference: "Proven procedures with established outcomes",
        innovation_adoption: "Late majority - waits for proven results"
      }
    },
    sales_adaptation_strategy: {
      communication_approach: [
        "Provide comprehensive treatment documentation",
        "Use visual aids and 3D modeling extensively",
        "Share relevant patient success stories",
        "Allow processing time between explanations"
      ],
      presentation_style: [
        "Methodical step-by-step treatment overview",
        "Detailed before/after comparisons",
        "Emphasis on natural, conservative results",
        "Clear timeline and recovery expectations"
      ],
      objection_handling: [
        "Acknowledge concerns thoroughly",
        "Provide evidence-based responses",
        "Offer to connect with similar past patients",
        "Suggest gradual treatment phases if applicable"
      ],
      closing_techniques: [
        "Summary of discussed benefits",
        "Soft commitment requests",
        "Family consultation inclusion",
        "Extended decision timeline respect"
      ]
    },
    engagement_optimization: {
      peak_attention_moments: [
        "3D smile preview reveal",
        "Similar case before/after reviews",
        "Payment plan explanation",
        "Recovery timeline discussion"
      ],
      ideal_follow_up: {
        frequency: "Weekly check-ins",
        content: "Educational materials and patient stories",
        method: "Email with occasional phone calls",
        duration: "2-3 weeks typical decision period"
      }
    },
    red_flags: [
      {
        indicator: "Rushed decision pressure",
        risk: "Patient withdrawal",
        mitigation: "Respect decision timeline, provide take-home materials"
      },
      {
        indicator: "Minimal visual evidence",
        risk: "Decreased confidence",
        mitigation: "Extensive photo galleries and 3D previews"
      },
      {
        indicator: "Spouse exclusion",
        risk: "Decision reversal",
        mitigation: "Invite spouse consultation or provide materials for sharing"
      }
    ],
    success_predictions: {
      conversion_probability: 73,
      optimal_timeline: "21-28 days from first consultation",
      key_success_factors: [
        "Comprehensive visual documentation",
        "Multiple touchpoints with practice",
        "Spouse involvement in process",
        "Flexible payment arrangements"
      ]
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#2196F3';
    if (score >= 40) return '#FF9800';
    return '#f44336';
  };

  const getDISCColor = (trait) => {
    const colors = {
      dominance: '#f44336',
      influence: '#FF9800',
      steadiness: '#4CAF50',
      conscientiousness: '#2196F3'
    };
    return colors[trait] || '#9E9E9E';
  };

  const PersonalityMeter = ({ label, value, color }) => (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {value}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(0,0,0,0.1)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: color
          }
        }}
      />
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ 
        background: 'linear-gradient(45deg, #9C27B0, #673AB7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold',
        mb: 3
      }}>
        Personality Insights Analysis
      </Typography>

      <Grid container spacing={3}>
        {/* Overall Profile */}
        <Grid item xs={12}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(103, 58, 183, 0.05))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(156, 39, 176, 0.2)'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Psychology sx={{ fontSize: 40, color: '#9C27B0', mr: 2 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {personalityData.overall_profile.primary_type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {personalityData.overall_profile.behavioral_summary}
                  </Typography>
                </Box>
                <Chip 
                  label={`${personalityData.overall_profile.confidence_score}% Confidence`}
                  sx={{ 
                    backgroundColor: '#9C27B0',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* DISC Analysis */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                DISC Behavioral Profile
              </Typography>
              
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Avatar sx={{ 
                  width: 80, 
                  height: 80, 
                  backgroundColor: '#9C27B0',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  mx: 'auto',
                  mb: 1
                }}>
                  {personalityData.disc_analysis.primary_style.split(' - ')[0]}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {personalityData.disc_analysis.primary_style}
                </Typography>
              </Box>

              <PersonalityMeter 
                label="Dominance" 
                value={personalityData.disc_analysis.dominance} 
                color={getDISCColor('dominance')} 
              />
              <PersonalityMeter 
                label="Influence" 
                value={personalityData.disc_analysis.influence} 
                color={getDISCColor('influence')} 
              />
              <PersonalityMeter 
                label="Steadiness" 
                value={personalityData.disc_analysis.steadiness} 
                color={getDISCColor('steadiness')} 
              />
              <PersonalityMeter 
                label="Conscientiousness" 
                value={personalityData.disc_analysis.conscientiousness} 
                color={getDISCColor('conscientiousness')} 
              />

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Key Traits:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {personalityData.disc_analysis.secondary_traits.map((trait, index) => (
                    <Chip 
                      key={index}
                      label={trait}
                      size="small"
                      variant="outlined"
                      sx={{ borderColor: '#9C27B0', color: '#9C27B0' }}
                    />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Communication Style */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Communication Preferences
              </Typography>
              
              {Object.entries(personalityData.communication_style).map(([key, value]) => (
                <Box key={key} sx={{ mb: 2 }}>
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

        {/* Motivational Drivers */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Motivational Drivers
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Star sx={{ color: '#FFD700', mr: 1 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    Primary Motivation
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {personalityData.motivational_drivers.primary}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Core Values:
                </Typography>
                <List dense>
                  {personalityData.motivational_drivers.values.map((value, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.25 }}>
                      <ListItemIcon sx={{ minWidth: 20 }}>
                        <Box sx={{ 
                          width: 6, 
                          height: 6, 
                          borderRadius: '50%', 
                          backgroundColor: '#4CAF50' 
                        }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={value}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#f44336' }}>
                  Key Fears:
                </Typography>
                <List dense>
                  {personalityData.motivational_drivers.fears.map((fear, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.25 }}>
                      <ListItemIcon sx={{ minWidth: 20 }}>
                        <Box sx={{ 
                          width: 6, 
                          height: 6, 
                          borderRadius: '50%', 
                          backgroundColor: '#f44336' 
                        }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={fear}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Dental-Specific Psychology */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Dental-Specific Psychology
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#f44336' }}>
                    Anxiety Triggers
                  </Typography>
                  <List dense>
                    {personalityData.dental_specific_psychology.anxiety_triggers.map((trigger, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <Box sx={{ 
                            width: 4, 
                            height: 4, 
                            borderRadius: '50%', 
                            backgroundColor: '#f44336' 
                          }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={trigger}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#4CAF50' }}>
                    Confidence Builders
                  </Typography>
                  <List dense>
                    {personalityData.dental_specific_psychology.confidence_builders.map((builder, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <Box sx={{ 
                            width: 4, 
                            height: 4, 
                            borderRadius: '50%', 
                            backgroundColor: '#4CAF50' 
                          }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={builder}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#2196F3' }}>
                    Decision Influencers
                  </Typography>
                  <List dense>
                    {personalityData.dental_specific_psychology.decision_influencers.map((influencer, index) => (
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
                          primary={influencer}
                          primaryTypographyProps={{ variant: 'body2', fontSize: '0.8rem' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Sales Adaptation Strategy */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Sales Adaptation Strategy
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Communication Approach:
                </Typography>
                <List dense>
                  {personalityData.sales_adaptation_strategy.communication_approach.map((approach, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.25 }}>
                      <ListItemIcon sx={{ minWidth: 20 }}>
                        <Lightbulb sx={{ fontSize: 14, color: '#FF9800' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={approach}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Optimal Closing Techniques:
                </Typography>
                <List dense>
                  {personalityData.sales_adaptation_strategy.closing_techniques.map((technique, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.25 }}>
                      <ListItemIcon sx={{ minWidth: 20 }}>
                        <TrendingUp sx={{ fontSize: 14, color: '#4CAF50' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={technique}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Success Predictions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Success Predictions
              </Typography>
              
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h3" sx={{ 
                  fontWeight: 'bold',
                  color: getScoreColor(personalityData.success_predictions.conversion_probability)
                }}>
                  {personalityData.success_predictions.conversion_probability}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Conversion Probability
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Optimal Timeline:</strong> {personalityData.success_predictions.optimal_timeline}
                </Typography>
              </Box>

              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Key Success Factors:
              </Typography>
              <List dense>
                {personalityData.success_predictions.key_success_factors.map((factor, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 0.25 }}>
                    <ListItemIcon sx={{ minWidth: 20 }}>
                      <Star sx={{ fontSize: 14, color: '#FFD700' }} />
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

        {/* Red Flags */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Behavioral Red Flags & Mitigation
              </Typography>
              
              <Grid container spacing={2}>
                {personalityData.red_flags.map((flag, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Paper sx={{ 
                      p: 2, 
                      backgroundColor: 'rgba(244, 67, 54, 0.1)',
                      border: '1px solid rgba(244, 67, 54, 0.2)',
                      height: '100%'
                    }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {flag.indicator}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        <strong>Risk:</strong> {flag.risk}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                        <strong>Mitigation:</strong> {flag.mitigation}
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

export default PersonalityInsightsAnalysis;