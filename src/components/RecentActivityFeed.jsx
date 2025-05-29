import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  TrendingUp,
  Psychology,
  Star,
  MonetizationOn,
  Schedule,
  Warning,
  CheckCircle,
  Assessment,
  Person,
  Phone,
  Email,
  VideoCall,
  More
} from '@mui/icons-material';

const RecentActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'insight',
      title: 'High-Value Opportunity Detected',
      description: 'Patient expressed strong interest in full smile makeover during 3D preview',
      timestamp: '2 minutes ago',
      priority: 'high',
      value: '$12,000',
      icon: <Star sx={{ color: '#FFD700' }} />,
      category: 'Emotional Intelligence',
      patient: 'Sarah M.',
      confidence: 92
    },
    {
      id: 2,
      type: 'alert',
      title: 'Objection Pattern Identified',
      description: 'Price sensitivity detected - recommend immediate payment plan discussion',
      timestamp: '8 minutes ago',
      priority: 'medium',
      icon: <Warning sx={{ color: '#FF9800' }} />,
      category: 'Objection Handling',
      patient: 'Sarah M.',
      actionRequired: 'Address financing concerns'
    },
    {
      id: 3,
      type: 'success',
      title: 'MEDDIC Score Improved',
      description: 'Decision criteria clearly established, timeline confirmed',
      timestamp: '12 minutes ago',
      priority: 'low',
      icon: <CheckCircle sx={{ color: '#4CAF50' }} />,
      category: 'MEDDIC Analysis',
      patient: 'Sarah M.',
      score: '78/100'
    },
    {
      id: 4,
      type: 'communication',
      title: 'Spouse Influence Factor',
      description: 'Patient mentioned need to discuss with husband - high decision impact',
      timestamp: '15 minutes ago',
      priority: 'high',
      icon: <Person sx={{ color: '#9C27B0' }} />,
      category: 'Personality Insights',
      patient: 'Sarah M.',
      recommendation: 'Include spouse in next consultation'
    },
    {
      id: 5,
      type: 'competitive',
      title: 'Competitor Mention Alert',
      description: 'SmileCare Dental Group mentioned for price comparison',
      timestamp: '18 minutes ago',
      priority: 'medium',
      icon: <TrendingUp sx={{ color: '#2196F3' }} />,
      category: 'Competitive Intelligence',
      patient: 'Sarah M.',
      threat: 'Price-based competition'
    },
    {
      id: 6,
      type: 'behavioral',
      title: 'Anxiety Spike Detected',
      description: 'Patient showed hesitation during pain discussion - provide reassurance',
      timestamp: '22 minutes ago',
      priority: 'medium',
      icon: <Psychology sx={{ color: '#FF5722' }} />,
      category: 'Talk Analytics',
      patient: 'Sarah M.',
      trigger: 'Treatment pain concerns'
    },
    {
      id: 7,
      type: 'action',
      title: 'Next Best Action Generated',
      description: 'Send 3D smile preview video within 2 hours for maximum impact',
      timestamp: '25 minutes ago',
      priority: 'critical',
      icon: <Assessment sx={{ color: '#4CAF50' }} />,
      category: 'Next Best Action',
      patient: 'Sarah M.',
      timeline: 'Within 2 hours'
    },
    {
      id: 8,
      type: 'risk',
      title: 'Risk Assessment Update',
      description: 'Overall risk decreased to 34/100 - manageable with current strategy',
      timestamp: '28 minutes ago',
      priority: 'low',
      icon: <Warning sx={{ color: '#4CAF50' }} />,
      category: 'Risk Assessment',
      patient: 'Sarah M.',
      riskLevel: 'Medium-Low'
    },
    {
      id: 9,
      type: 'negotiation',
      title: 'Harvey Specter Technique Applied',
      description: 'Value anchoring successful - patient focused on outcomes over price',
      timestamp: '32 minutes ago',
      priority: 'low',
      icon: <Star sx={{ color: '#FFD700' }} />,
      category: 'Negotiation Master',
      patient: 'Sarah M.',
      harveyScore: '8.5/10'
    },
    {
      id: 10,
      type: 'milestone',
      title: 'Consultation Milestone Reached',
      description: 'Patient moved to "Ready to Schedule" phase with high conversion probability',
      timestamp: '35 minutes ago',
      priority: 'high',
      icon: <CheckCircle sx={{ color: '#4CAF50' }} />,
      category: 'Overall Progress',
      patient: 'Sarah M.',
      probability: '73%'
    }
  ];

  const dentalInsights = [
    {
      id: 'insight1',
      type: 'trend',
      title: 'Dental Industry Trend Alert',
      description: '3D smile design requests up 45% this quarter - leverage technology advantage',
      timestamp: '1 hour ago',
      category: 'Market Intelligence',
      impact: 'Opportunity to upsell premium planning'
    },
    {
      id: 'insight2',
      type: 'seasonal',
      title: 'Seasonal Booking Pattern',
      description: 'Summer wedding season approaching - emphasize timeline for perfect smile',
      timestamp: '2 hours ago',
      category: 'Timing Intelligence',
      impact: 'Natural urgency creation opportunity'
    },
    {
      id: 'insight3',
      type: 'competitive',
      title: 'Competitor Analysis Update',
      description: 'Elite Cosmetic Dentistry raised prices 15% - improved positioning opportunity',
      timestamp: '3 hours ago',
      category: 'Competitive Intelligence',
      impact: 'Enhanced value proposition strength'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return '#f44336';
      case 'high': return '#FF9800';
      case 'medium': return '#2196F3';
      case 'low': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      insight: '#FFD700',
      alert: '#FF9800',
      success: '#4CAF50',
      communication: '#9C27B0',
      competitive: '#2196F3',
      behavioral: '#FF5722',
      action: '#4CAF50',
      risk: '#f44336',
      negotiation: '#FFD700',
      milestone: '#4CAF50'
    };
    return colors[type] || '#9E9E9E';
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', px: 2, pt: 2 }}>
        Recent Activity
      </Typography>
      
      <Box sx={{ flex: 1, overflowY: 'auto', px: 2 }}>
        <List dense>
          {activities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem 
                sx={{ 
                  alignItems: 'flex-start',
                  px: 0,
                  py: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    borderRadius: 1
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                  <Avatar sx={{ 
                    width: 28, 
                    height: 28, 
                    backgroundColor: getTypeColor(activity.type),
                    '& .MuiSvgIcon-root': { fontSize: 16 }
                  }}>
                    {activity.icon}
                  </Avatar>
                </ListItemIcon>
                
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', flex: 1 }}>
                        {activity.title}
                      </Typography>
                      <Chip 
                        label={activity.priority}
                        size="small"
                        sx={{ 
                          backgroundColor: getPriorityColor(activity.priority),
                          color: 'white',
                          height: 20,
                          fontSize: '0.7rem'
                        }}
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {activity.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Typography variant="caption" color="text.secondary">
                          {activity.timestamp}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          backgroundColor: 'rgba(0,0,0,0.1)',
                          px: 1,
                          py: 0.25,
                          borderRadius: 1,
                          fontSize: '0.7rem'
                        }}>
                          {activity.category}
                        </Typography>
                        {activity.patient && (
                          <Typography variant="caption" sx={{ 
                            backgroundColor: 'rgba(156, 39, 176, 0.1)',
                            color: '#9C27B0',
                            px: 1,
                            py: 0.25,
                            borderRadius: 1,
                            fontSize: '0.7rem',
                            fontWeight: 'bold'
                          }}>
                            {activity.patient}
                          </Typography>
                        )}
                        {activity.value && (
                          <Typography variant="caption" sx={{ 
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            color: '#4CAF50',
                            px: 1,
                            py: 0.25,
                            borderRadius: 1,
                            fontSize: '0.7rem',
                            fontWeight: 'bold'
                          }}>
                            {activity.value}
                          </Typography>
                        )}
                        {activity.confidence && (
                          <Typography variant="caption" sx={{ 
                            backgroundColor: 'rgba(33, 150, 243, 0.1)',
                            color: '#2196F3',
                            px: 1,
                            py: 0.25,
                            borderRadius: 1,
                            fontSize: '0.7rem'
                          }}>
                            {activity.confidence}% confidence
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  }
                />
                
                <IconButton size="small" sx={{ ml: 1 }}>
                  <More sx={{ fontSize: 16 }} />
                </IconButton>
              </ListItem>
              {index < activities.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>

        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 3, mb: 1, px: 1 }}>
          Dental Industry Insights
        </Typography>
        
        <List dense>
          {dentalInsights.map((insight, index) => (
            <React.Fragment key={insight.id}>
              <ListItem 
                sx={{ 
                  alignItems: 'flex-start',
                  px: 0,
                  py: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    borderRadius: 1
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                  <Avatar sx={{ 
                    width: 28, 
                    height: 28, 
                    backgroundColor: '#E3F2FD',
                    color: '#1976D2',
                    '& .MuiSvgIcon-root': { fontSize: 16 }
                  }}>
                    <TrendingUp />
                  </Avatar>
                </ListItemIcon>
                
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {insight.title}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {insight.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          {insight.timestamp}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          backgroundColor: 'rgba(33, 150, 243, 0.1)',
                          color: '#2196F3',
                          px: 1,
                          py: 0.25,
                          borderRadius: 1,
                          fontSize: '0.7rem'
                        }}>
                          {insight.category}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ 
                        color: '#4CAF50',
                        fontWeight: 'bold',
                        display: 'block',
                        mt: 0.5
                      }}>
                        💡 {insight.impact}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < dentalInsights.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default RecentActivityFeed;